import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TrimFieldValueDirective } from './trim-field-value.directive';

@Component({
  template: `<form [formGroup]="form">
    <input class="input-val" [trimFieldValue] formControlName="control" />
  </form>`,
})
class HostComponent {
  form = new FormGroup({
    control: new FormControl(' initial value '),
  });
}

describe('TrimFieldValueDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [HostComponent, TrimFieldValueDirective],
      providers: [FormControl],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).createComponent(HostComponent);

    fixture.detectChanges(); // initial binding
  });

  it('should trim white spaces', () => {
    fixture.whenStable().then(() => {
      const input = fixture.debugElement.query(By.css('.input-val'));
      const inputEl = input.nativeElement as HTMLInputElement;
      inputEl.dispatchEvent(new Event('change'));
      expect(inputEl.value).toEqual('initial value');
    });
  });

  it('should not update trimmed value', () => {
    fixture.whenStable().then(() => {
      const input = fixture.debugElement.query(By.css('.input-val'));
      const inputEl = input.nativeElement as HTMLInputElement;
      inputEl.value = 'new value';
      inputEl.dispatchEvent(new Event('input'));
      inputEl.dispatchEvent(new Event('change'));
      expect(inputEl.value).toEqual('new value');
    });
  });
});
