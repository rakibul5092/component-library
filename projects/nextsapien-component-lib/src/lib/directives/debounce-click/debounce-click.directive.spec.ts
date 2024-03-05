import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebounceClickDirective } from './debounce-click.directive';

@Component({
  template: ` <button [appDebounceClick] (debounceClick)="debounceClick()">Click me</button> `,
})
class HostComponent {
  clicked = 0;
  debounceClick() {
    ++this.clicked;
  }
}

describe('DebounceClickDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HostComponent, DebounceClickDirective],
      schemas: [NO_ERRORS_SCHEMA],
    }).createComponent(HostComponent);

    fixture.detectChanges(); // initial binding
  });

  it('should emit two clicks', fakeAsync(() => {
    fixture.whenStable().then(() => {
      const debugTag = fixture.debugElement.query(By.css('button'));
      const InputEl = debugTag.nativeElement as HTMLElement;
      const directiveEl = fixture.debugElement.query(By.directive(DebounceClickDirective));
      const component = fixture.componentInstance;
      expect(directiveEl).not.toBeNull();
      InputEl.dispatchEvent(new Event('click'));
      tick(301);
      InputEl.dispatchEvent(new Event('click'));
      tick(301);
      expect(component.clicked).toBe(2);
    });
  }));

  it('should emit one click', fakeAsync(() => {
    fixture.whenStable().then(() => {
      const debugTag = fixture.debugElement.query(By.css('button'));
      const InputEl = debugTag.nativeElement as HTMLElement;
      const directiveEl = fixture.debugElement.query(By.directive(DebounceClickDirective));
      const component = fixture.componentInstance;
      expect(directiveEl).not.toBeNull();
      InputEl.dispatchEvent(new Event('click'));
      tick(1);
      InputEl.dispatchEvent(new Event('click'));
      tick(301);
      expect(component.clicked).toBe(1);
    });
  }));
});
