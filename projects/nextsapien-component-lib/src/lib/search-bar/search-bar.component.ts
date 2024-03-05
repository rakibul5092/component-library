import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'lib-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {
  @Input() showIcon = true;
  @Input() placeholderText: string;
  @Input() inputText: string;
  @Output() searchStringChange = new EventEmitter();
  @Output() cleared = new EventEmitter();
  @Output() focused = new EventEmitter();
  @Output() unfocused = new EventEmitter();
  @ViewChild('searchInput', { static: true }) input: ElementRef;

  // ----- Methods called by template -----

  /**
   *
   * A method to return user input to default
   */
  public clear() {
    this.inputText = '';
    this.searchStringChange.emit('');
    this.cleared.emit();
  }

  /**
   *
   * A method to focus on the input element
   */
  public focus() {
    this.input.nativeElement.focus();
  }

  public handleFocus() {
    this.focused.emit();
  }

  public handleFocusOut() {
    this.unfocused.emit();
  }

  /**
   *
   * A method to notify subscribers of user input
   */
  public emit() {
    this.searchStringChange.emit(this.input.nativeElement.value);
  }
}
