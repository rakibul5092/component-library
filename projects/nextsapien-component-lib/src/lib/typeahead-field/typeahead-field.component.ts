import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { debounceTime, first, switchMap, takeUntil } from 'rxjs/operators';
import { ItemSummary } from '../model/item-summary';
import { TypeaheadResultsGroup } from '../model/typeahead-results-group';

@Component({
  selector: 'lib-typeahead-result',
  templateUrl: './typeahead-result.component.html',
  styleUrls: ['./typeahead-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypeaheadResultComponent {
  @Input() groups: TypeaheadResultsGroup[] = [];
  @Input() selectionFunc: (item: ItemSummary<any>) => void;
  @Input() alternateFunc: () => any;
  @Input() alternateText: string;
  @Input() loading: boolean;

  @Output() alternateCalled: EventEmitter<void> = new EventEmitter();

  /**
   * Method to execute passed in function if it is defined
   */
  public handleAlternateFunction(): void {
    this.alternateCalled.emit();
  }

  /**
   *
   * @param item - item that was selected
   *
   * A method to invoke passed in selection func with item if it is defined
   */
  public itemSelected(item: ItemSummary<any>): void {
    if (this.selectionFunc && this.selectionFunc.call) {
      this.selectionFunc(item);
    }
  }
}

@Component({
  selector: 'lib-typeahead-field',
  templateUrl: './typeahead-field.component.html',
  styleUrls: ['./typeahead-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypeaheadFieldComponent implements OnInit, OnDestroy {
  @Input() entityFunctions: {
    searchFunction: (value: string) => Observable<any[]>;
    mappingFunction: (entity: any) => Observable<ItemSummary<any>>;
    filterFunction: (entity: any) => boolean;
    sortingFunction: (a: ItemSummary<any>, b: ItemSummary<any>) => number;
    resultGroupFunction?: (results: ItemSummary<any>[]) => TypeaheadResultsGroup[];
    entityMetadata?: { typeLabel: string; iconHtml: SafeHtml; placeholderText: string };
  }[];
  @Input() selectedEntityIndex = 0;
  @Input() selectionFunction: (item: ItemSummary<any>) => void;
  @Input() fieldName: string;
  @Input() placeholderText = '';
  @Input() resultLimit = 0;
  @Input() alternateText = '';
  @Input() alternateFunction: (value: string) => any;
  @Input() error = '';
  @Input() set defaultText(value: string) {
    this.inputText = value;
  }
  @Input() defaultSearchString = '';
  @Input() suggestionText = '';
  @Input() required = false;
  @Input() isMultiselectMode = false;
  @Input() rowEditConfirmationObsv: Observable<{ fieldName: string; fieldValue: any }>;
  @Input() entitySelectMode = false;

  @ViewChild('typeahead', { static: true }) typeahead: ElementRef;

  public searchResults: TypeaheadResultsGroup[] = [];
  public inputText = '';
  public loading = false;
  public displayResults = false;
  public focused = false;

  private searchStringSubject: Subject<string> = new Subject();
  private inputStringSubject: Subject<string> = new Subject();
  private clickOutSubject: Subject<string> = new Subject();
  private componentDestroyed$: Subject<null> = new Subject();

  @Output() inputStringChange: Observable<string> = this.inputStringSubject.asObservable();
  @Output() selected: EventEmitter<ItemSummary<any>> = new EventEmitter<ItemSummary<any>>();
  @Output() deselected = new EventEmitter();

  constructor(private changeDetectorRef: ChangeDetectorRef, private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.typeahead.nativeElement.contains(e.target)) {
        this.clickOutSubject.next(null);
      }
    });
  }

  // ----- Angular lifecycle methods

  ngOnInit() {
    this.clickOutSubject
      .asObservable()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(() => {
        this.displayResults = false;
        this.changeDetectorRef.detectChanges();
      });
    this.searchStringSubject
      .asObservable()
      .pipe(
        // Debounce as to not overload backend with requests
        debounceTime(500),
        takeUntil(this.componentDestroyed$),

        // Switch map to disregard old requests if newer requests returns first
        switchMap((value: string) => {
          // Wait til two letters for performance reasons
          if (value.length && value.length > 1) {
            this.searchResults = [];
            this.loading = true;
            this.displayResults = true;
            this.changeDetectorRef.detectChanges();
            return combineLatest([...this.getSearchFuncs(value)]);
          } else {
            if (!value.length) {
              this.clear();
            }
            this.displayResults = false;
            this.loading = false;
            this.changeDetectorRef.detectChanges();
            return of([[]]);
          }
        }),
      )
      .subscribe((resultsMatrix: any[][]) => {
        if (resultsMatrix.length) {
          const resultGroups: TypeaheadResultsGroup[] = [];
          const allMappingObsvs: Observable<any>[] = [];
          resultsMatrix.forEach((results, index) => {
            if (this.entitySelectMode) {
              index = this.selectedEntityIndex;
            }
            const entityMappingObsvs: Observable<ItemSummary<any>>[] = results.map((result) => this.entityFunctions[index].mappingFunction(result));
            allMappingObsvs.push(...entityMappingObsvs);
            if (entityMappingObsvs.length) {
              combineLatest(entityMappingObsvs)
                .pipe(first())
                .subscribe((summaries) => {
                  const groupFunction = this.entityFunctions[index].resultGroupFunction;
                  const searchString = this.inputText ? this.inputText : this.defaultSearchString;
                  if (groupFunction) {
                    const groupResults = groupFunction(summaries);
                    groupResults.forEach((result) => {
                      result.summaries = this.getListSortedByMostAccurateMatch(result.summaries, searchString, this.entityFunctions[index].sortingFunction);
                      if (result.summaries.length) {
                        resultGroups.push(result);
                      }
                    });
                  } else {
                    resultGroups.push({
                      summaries: this.getListSortedByMostAccurateMatch(summaries, searchString, this.entityFunctions[index].sortingFunction),
                    });
                  }
                });
            }
          });
          if (allMappingObsvs.length) {
            combineLatest(allMappingObsvs)
              .pipe(first())
              .subscribe(() => {
                this.loading = false;

                if (resultGroups.some((resultGroup) => resultGroup.summaries?.length)) {
                  this.searchResults = resultGroups.sort((group1, group2) => {
                    // Check if both are null or empty then compare.
                    return !group1.groupName && group2.groupName
                      ? -1
                      : !group2.groupName
                      ? 1
                      : group1.groupName.toLocaleUpperCase() > group2.groupName.toLocaleUpperCase()
                      ? 1
                      : -1;
                  });
                } else {
                  this.searchResults = [];
                }
                this.changeDetectorRef.detectChanges();
              });
          } else {
            this.loading = false;
            this.searchResults = [];
            this.changeDetectorRef.detectChanges();
          }
        }
      });
    this.rowEditConfirmationObsv?.pipe(takeUntil(this.componentDestroyed$)).subscribe((response) => {
      if (response?.fieldName === this.fieldName && response.fieldValue < 0) {
        this.displayResults = false;
        (document.querySelector(':focus') as HTMLElement)?.blur();
      }
    });
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(null);
    this.componentDestroyed$.complete();
  }

  // ----- Methods -----

  private getSearchFuncs(value: string): Observable<any[]>[] {
    if (this.entitySelectMode) {
      return [this.entityFunctions[this.selectedEntityIndex].searchFunction(value)];
    } else {
      return this.entityFunctions.map((entityFunction) => entityFunction.searchFunction(value));
    }
  }

  // ----- Methods called by template -----

  /**
   *
   * A method to update search subject with user input
   *
   * @param searchString - User entered search string
   */
  public search(searchString: string) {
    this.inputText = searchString;
    this.inputStringSubject.next(searchString);
    this.searchStringSubject.next(searchString);
  }

  /**
   *
   * A method to add recipient or attendee
   *
   * @param item - The ItemSummary that was selected
   */
  public itemSelected(item: ItemSummary<any>): void {
    if (!this.isMultiselectMode) {
      this.inputText = item.header.label;
      this.inputStringSubject.next(this.inputText);
      this.displayResults = false;
      this.changeDetectorRef.detectChanges();
    } else {
      const searchInput = this.typeahead.nativeElement.querySelector('#searchInput');
      searchInput.value = '';
      searchInput.focus();
    }
    if (this.selectionFunction) {
      this.selectionFunction(item);
    }
    this.selected.emit(item);
  }

  /**
   * Wraps the above method in a closure for consumption by the nested component
   */
  public resultSelectFunc: (item: ItemSummary<any>) => void = (item: ItemSummary<any>, group?: TypeaheadResultsGroup) => this.itemSelected(item);

  /**
   * A method to notify parent when search bar clear is clicked
   */
  public clear(): void {
    this.displayResults = false;
    this.changeDetectorRef.detectChanges();
    this.deselected.emit();
  }

  /**
   * Runs a search using the defaultSearchString when suggestion text is clicked
   */
  public handleSuggestionClicked(): void {
    if (this.defaultSearchString && !this.inputText) {
      this.searchStringSubject.next(this.defaultSearchString);
    }
  }

  /**
   *
   * @param list - An Item Summary Array
   * @param searchString - String
   *
   * @return - A list of results
   *
   * This method sorts search results by most accurate according to the current search string. Begins after two characters typed.
   */
  private getListSortedByMostAccurateMatch(
    list: ItemSummary<any>[],
    searchString: string,
    sortingFunction: (a: ItemSummary<any>, b: ItemSummary<any>) => number,
  ): ItemSummary<any>[] {
    const sort = sortingFunction ? sortingFunction : this.sortByHeader;
    const separatedLists: ItemSummary<any>[][] = this.breakListIntoSortSections(list, searchString);
    const resultList: ItemSummary<any>[] = [];
    for (let i = 0; i < 3; i++) {
      separatedLists[i] = separatedLists[i].sort(sort);
      resultList.push(...separatedLists[i]);
    }
    return resultList;
  }

  /**
   *
   * @param list - An Item Summary Array
   * @param searchString - String
   *
   * @return - An Array of lists, that each contain ItemSummaries that match different conditions to the search.
   *
   * This method is used by getListSortedByMostAccurateMatch to filter search results by placing them into sorted lists according to specific conditions measured against the search string value.
   */
  private breakListIntoSortSections(list: ItemSummary<any>[], searchString: string): ItemSummary<any>[][] {
    const searchCapitalized: string = searchString.toLocaleUpperCase();
    const exactMatchList: ItemSummary<any>[] = [];
    const startsWithList: ItemSummary<any>[] = [];
    const includesList: ItemSummary<any>[] = [];
    list.forEach((nextSummary) => {
      const infoLines: string[] = [];
      nextSummary.header.label ? infoLines.push(nextSummary.header.label.toLocaleUpperCase()) : null;
      nextSummary.subheaders.forEach((nextSubheader) => (nextSubheader.label ? infoLines.push(nextSubheader.label.toLocaleUpperCase()) : null));
      nextSummary.details.forEach((nextDetail) => (nextDetail.label ? infoLines.push(nextDetail.label.toLocaleUpperCase()) : null));
      if (infoLines.find((nextLine) => nextLine === searchCapitalized)) {
        exactMatchList.push(nextSummary);
      } else if (infoLines.find((nextLine) => nextLine.startsWith(searchCapitalized))) {
        startsWithList.push(nextSummary);
      } else if (infoLines.find((nextLine) => nextLine.includes(searchCapitalized))) {
        includesList.push(nextSummary);
      }
    });
    return [exactMatchList, startsWithList, includesList];
  }

  /**
   *
   * @param a - An Item Summary
   * @param b - An Item Summary
   *
   * @return - A number. -1 if b.header is > a.header, 0 if the same, and 1 if a.header > b.header
   */
  private sortByHeader(a: ItemSummary<any>, b: ItemSummary<any>): number {
    return a.header.label.toLocaleUpperCase().localeCompare(b.header.label.toLocaleUpperCase());
  }

  public handleAlternateCalled(): void {
    this.alternateFunction(this.inputText);
  }

  public handleFocus(): void {
    this.focused = true;
  }

  public handleFocusOut(): void {
    this.focused = false;
  }
}
