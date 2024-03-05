import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { SearchBarComponent } from './search-bar.component';

xdescribe('SearchBarComp', () => {
  let comp: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchBarComponent],
      imports: [BrowserModule, FormsModule],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(SearchBarComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
        fixture.detectChanges();
      });
  }));

  it('should display placeholder text', async(() => {
    comp.placeholderText = 'placeholder text';
    fixture.detectChanges();

    el = de.query(By.css('.search-bar__input')).nativeElement;
    expect(el.getAttribute('placeholder')).toEqual('placeholder text');
  }));

  it('should clear input text', async(() => {
    comp.inputText = 'input text';
    fixture.detectChanges();

    spyOn(comp.cleared, 'emit');
    spyOn(comp.searchStringChange, 'emit');
    comp.clear();
    expect(comp.cleared.emit).toHaveBeenCalled();
    expect(comp.searchStringChange.emit).toHaveBeenCalledWith('');
    expect(comp.inputText).toEqual('');

    spyOn(comp, 'clear');
    el = de.query(By.css('.search-bar__clear-icon')).nativeElement;
    el.click();
    expect(comp.clear).toHaveBeenCalled();
  }));

  it('should emit an even on input change', async(() => {
    spyOn(comp.searchStringChange, 'emit');
    el = de.query(By.css('.search-bar__input')).nativeElement;
    (<HTMLInputElement>el).value = 'input text';
    el.dispatchEvent(new KeyboardEvent('keyup'));
    expect(comp.searchStringChange.emit).toHaveBeenCalledWith('input text');
  }));

  it('should focus on input element', async(() => {
    spyOn(comp, 'focus');
    de.query(By.css('.search-bar__search-icon')).nativeElement.click();
    expect(comp.focus).toHaveBeenCalled();
  }));
});
