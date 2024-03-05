import { OverlayModule } from '@angular/cdk/overlay';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule, By } from '@angular/platform-browser';
import { TooltipDirective } from '../directives/tooltip/tooltip.directive';
import { ItemInfoLine } from '../model/item-info-line copy';
import { ItemSummary } from '../model/item-summary';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { TypeaheadFieldComponent, TypeaheadResultComponent } from './typeahead-field.component';

xdescribe('TypeaheadComp', () => {
  let typeaheadComp: TypeaheadFieldComponent;
  let typeaheadFixture: ComponentFixture<TypeaheadFieldComponent>;
  let resultComp: TypeaheadResultComponent;
  let resultFixture: ComponentFixture<TypeaheadResultComponent>;
  let typeaheadDe: DebugElement;
  let resultDe: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TypeaheadFieldComponent, TypeaheadResultComponent, SearchBarComponent, TooltipDirective],
      imports: [BrowserModule, FormsModule, MatCheckboxModule, MatProgressSpinnerModule, OverlayModule],
    })
      .compileComponents()
      .then(() => {
        typeaheadFixture = TestBed.createComponent(TypeaheadFieldComponent);
        typeaheadComp = typeaheadFixture.componentInstance;
        typeaheadDe = typeaheadFixture.debugElement;

        typeaheadComp.entityFunctions = [
          {
            searchFunction: (value: string) => null,
            mappingFunction: (entity: any) => null,
            filterFunction: (entity: any) => null,
            sortingFunction: (a: ItemSummary<any>, b: ItemSummary<any>) => 1,
          },
        ];

        typeaheadFixture.detectChanges();

        resultFixture = TestBed.createComponent(TypeaheadResultComponent);
        resultComp = resultFixture.componentInstance;
        resultDe = resultFixture.debugElement;
        resultFixture.detectChanges();
      });
  }));

  it('should display error text', async(() => {
    // verify that error text does not display when error is unset
    expect(typeaheadDe.query(By.css('.typeahead-field__error-text'))).toBeNull();

    // verify that error text displays
    typeaheadComp.error = 'Error';
    typeaheadFixture.detectChanges();
    typeaheadDe = typeaheadDe.query(By.css('.typeahead-field__error-text'));
    expect(typeaheadDe).not.toBeNull();
    el = typeaheadDe.nativeElement;
    expect(el.innerText.trim()).toEqual('Error');
  }));

  it('should display suggestion text', async(() => {
    // verify that suggestion text does not display when suggestion is unset
    expect(typeaheadDe.query(By.css('.typeahead-field__suggestion-text'))).toBeNull();

    // verify that suggestion text displays
    typeaheadComp.suggestionText = 'suggestion';
    typeaheadFixture.detectChanges();
    typeaheadDe = typeaheadDe.query(By.css('.typeahead-field__suggestion-text'));
    expect(typeaheadDe).not.toBeNull();
    el = typeaheadDe.nativeElement;
    expect(el.innerText.trim()).toEqual('suggestion');
  }));

  it('should exhibit correct search behavior', async(() => {
    spyOn(typeaheadComp['inputStringSubject'], 'next');
    spyOn(typeaheadComp['searchStringSubject'], 'next');

    typeaheadComp.search('input');
    expect(typeaheadComp.inputText).toEqual('input');
    expect(typeaheadComp['inputStringSubject'].next).toHaveBeenCalled();
    expect(typeaheadComp['searchStringSubject'].next).toHaveBeenCalled();
  }));

  it('should emit event when search input cleared', async(() => {
    spyOn(typeaheadComp.deselected, 'emit');
    typeaheadComp.clear();
    expect(typeaheadComp.deselected.emit).toHaveBeenCalled();
  }));

  it('should exhibit correct item select behavior in field', async(() => {
    spyOn(typeaheadComp['inputStringSubject'], 'next');
    spyOn(typeaheadComp.selected, 'emit');
    const itemSummary: ItemSummary<any> = new ItemSummary(new ItemInfoLine('Item 1', null, null), null, null, null);
    typeaheadComp.itemSelected(itemSummary);
    expect(typeaheadComp.inputText).toEqual('Item 1');
    expect(typeaheadComp['inputStringSubject'].next).toHaveBeenCalledWith('Item 1');
    expect(typeaheadComp.displayResults).toBe(false);
    expect(typeaheadComp.selected.emit).toHaveBeenCalledWith(itemSummary);

    const selectionFunction: (item: ItemSummary<any>) => void = () => null;
    typeaheadComp.selectionFunction = selectionFunction;
    spyOn(typeaheadComp, 'selectionFunction');
    typeaheadComp.itemSelected(itemSummary);
    expect(typeaheadComp.selectionFunction).toHaveBeenCalledWith(itemSummary);
  }));

  it('should run a default search when suggestion text is clicked', async(() => {
    typeaheadFixture.detectChanges();
    spyOn(typeaheadComp['searchStringSubject'], 'next');
    typeaheadComp.handleSuggestionClicked();
    expect(typeaheadComp['searchStringSubject'].next).not.toHaveBeenCalled();

    typeaheadComp.defaultSearchString = 'default';
    typeaheadComp.inputText = 'input';
    typeaheadComp.handleSuggestionClicked();
    expect(typeaheadComp['searchStringSubject'].next).not.toHaveBeenCalled();

    typeaheadComp.suggestionText = 'suggestion';
    typeaheadComp.inputText = '';
    typeaheadFixture.detectChanges();
    typeaheadComp.handleSuggestionClicked();
    expect(typeaheadComp['searchStringSubject'].next).toHaveBeenCalled();

    spyOn(typeaheadComp, 'handleSuggestionClicked');
    typeaheadDe = typeaheadDe.query(By.css('.typeahead-field__suggestion-text'));
    expect(typeaheadDe).not.toBeNull();
    el = typeaheadDe.nativeElement;
    el.click();
    expect(typeaheadComp.handleSuggestionClicked).toHaveBeenCalled();
  }));

  it('should display loading indicator', async(() => {
    expect(resultDe.query(By.css('.typeahead-result__progress'))).toBeNull();

    resultComp.loading = true;
    resultFixture.detectChanges();
    expect(resultDe.query(By.css('.typeahead-result__progress'))).not.toBeNull();

    resultComp.groups = [
      {
        summaries: [new ItemSummary(new ItemInfoLine('Item 1', null, null), null, null, null)],
      },
    ];
    resultFixture.detectChanges();
    expect(resultDe.query(By.css('.typeahead-result__progress'))).toBeNull();
  }));

  it('should display alternate text and exhibit correct alternate functionality', async(() => {
    expect(resultDe.query(By.css('.typeahead-result__alternate-function'))).toBeNull();

    resultComp.alternateText = 'Alternate';
    resultFixture.detectChanges();
    resultDe = resultDe.query(By.css('.typeahead-result__alternate-function'));
    expect(resultDe).not.toBeNull();
    el = resultDe.nativeElement;
    expect(el.innerText.trim()).toEqual('Alternate');

    resultComp.alternateFunc = () => null;
    spyOn(resultComp, 'alternateFunc');
    resultComp.handleAlternateFunction();
    expect(resultComp.alternateFunc).toHaveBeenCalled();

    spyOn(resultComp, 'handleAlternateFunction');
    el.click();
    expect(resultComp.handleAlternateFunction).toHaveBeenCalled();
  }));

  it('should exhibit correct item select behavior in result', async(() => {
    resultComp.groups = [
      {
        summaries: [new ItemSummary(new ItemInfoLine('Item 1', null, null), null, null, null)],
      },
    ];
    resultFixture.detectChanges();

    resultComp.selectionFunc = () => null;
    spyOn(resultComp, 'selectionFunc');
    resultComp.itemSelected(resultComp.groups[0].summaries[0]);
    expect(resultComp.selectionFunc).toHaveBeenCalled();

    spyOn(resultComp, 'itemSelected');
    resultDe = resultDe.query(By.css('.info-card'));
    expect(resultDe).not.toBeNull();
    el = resultDe.nativeElement;
    el.click();
    expect(resultComp.itemSelected).toHaveBeenCalled();
  }));

  it('should have multiple sections with title', async(() => {
    resultComp.groups = [
      {
        summaries: [new ItemSummary(new ItemInfoLine('Item 1', null, null), null, null, null)],
        groupName: '1',
      },
      {
        summaries: [new ItemSummary(new ItemInfoLine('Item 2', null, null), null, null, null)],
        groupName: '2',
      },
    ];
    resultFixture.detectChanges();

    expect(resultDe.queryAll(By.css('.typeahead-result__group-name')).length).toEqual(2);
    expect(resultDe.queryAll(By.css('lib-info-card-list')).length).toEqual(2);
  }));
});
