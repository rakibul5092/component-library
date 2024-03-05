import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AutoFocusDirective } from './autoFocus.directive';

@Component({
  template: `
    <input type="text" [autoFocus]="false" />
    <input type="text" [autoFocus]="true" />
    <input type="text" [autoFocus] />
    <input type="text" />
  `,
})
class HostComponent {}

describe('AutoFocusDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let focusedInput: DebugElement[];

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [HostComponent, AutoFocusDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).createComponent(HostComponent);

    fixture.detectChanges(); // initial binding

    // input with an attached AutoFocusDirective
    focusedInput = fixture.debugElement.queryAll(By.directive(AutoFocusDirective));
  });

  it('should get input fields with directive', () => {
    expect(focusedInput.length).toBe(3);
  });

  it('should get input fields with focus', () => {
    expect(fixture.debugElement.queryAll(By.css('input:focus')).length).toBe(1);
  });
});
