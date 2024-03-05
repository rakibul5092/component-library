import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { OrdinaryPositiveNumberDirective } from './ordinary-positive-number.directive';

@Component({
  template: ` <input [ordinaryPositiveNumber] /> `,
})
class HostComponent {}

describe('OrdinaryPositiveNumberDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HostComponent, OrdinaryPositiveNumberDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).createComponent(HostComponent);

    fixture.detectChanges(); // initial binding
  });

  it('should get numeric only', () => {
    fixture.whenStable().then(() => {
      const numberDebug = fixture.debugElement.query(By.css('input'));
      const numberInput = numberDebug.nativeElement as HTMLInputElement;
      fakeTyping('12abc34de', numberInput);
      expect(numberInput.value).toBe('1234');
    });
  });

  function fakeTyping(value: string, inputEl: HTMLInputElement) {
    let result: string = '';
    for (const char of value) {
      const eventMock = createKeyDownEvent(char);
      inputEl.dispatchEvent(eventMock);
      if (eventMock.defaultPrevented) {
        // invalid char
      } else {
        result = result.concat(char);
      }
    }

    inputEl.value = result;
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }
});

export function createKeyDownEvent(value: string, cancelable = true) {
  return new KeyboardEvent('keydown', { key: value, cancelable });
}
