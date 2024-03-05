import { Overlay } from '@angular/cdk/overlay';
import { DecimalPipe } from '@angular/common';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, UntypedFormControl, Validators } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import moment from 'moment';
import { TooltipDirective } from '../directives/tooltip/tooltip.directive';
import { FormFieldComponent } from './form-field.component';

xdescribe('FormFieldComp', () => {
  let comp: FormFieldComponent;
  let fixture: ComponentFixture<FormFieldComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormFieldComponent, TooltipDirective],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatMomentDateModule,
        MatOptionModule,
        MatRadioModule,
        MatSelectModule,
        ReactiveFormsModule,
      ],
      providers: [Overlay, DecimalPipe],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(FormFieldComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;

        comp.formFieldControl = new UntypedFormControl(null, Validators.required);

        fixture.detectChanges();
      });
  }));

  it('should display label and label icon', async(() => {
    // verify that label and icon do not display if unset
    expect(de.query(By.css('.form-field__label'))).toBeNull();

    comp.label = 'label';
    comp.iconHtml = '<i class="icon"></i>';
    fixture.detectChanges();
    el = de.query(By.css('.form-field__label-text')).nativeElement;
    expect(el.innerText).toEqual('label');
    el = de.query(By.css('.form-field__label-icon')).nativeElement;
    expect(el.innerHTML).toEqual('<i class="icon"></i>');
  }));

  it('should display required indicator', async(() => {
    // verify that indicator does not display when required is false
    comp.label = 'label';
    fixture.detectChanges();
    expect(de.query(By.css('.form-field__required'))).toBeNull();

    // verify that indicator displays
    comp.required = true;
    fixture.detectChanges();
    el = de.query(By.css('.form-field__required')).nativeElement;
    expect(el.innerText).toEqual('*');
  }));

  it('should display pattern error text', async(() => {
    // verify that error text does not display when field is not
    // submitted and has no errors
    expect(de.query(By.css('.form-field__error-text'))).toBeNull();
    comp.formFieldControl = new UntypedFormControl(null, Validators.pattern(new RegExp('^[0-9]*$')));
    comp.submitted = true;
    comp.invalidPatternMessage = 'Test';
    comp.formFieldControl.setValue('aa');
    fixture.detectChanges();
    el = de.query(By.css('.form-field__error-text')).nativeElement;
    expect(el.innerText).toEqual('Test');
  }));

  it('should display error text', async(() => {
    // verify that error text does not display when field is not
    // submitted and has no errors
    expect(de.query(By.css('.form-field__error-text'))).toBeNull();

    // verify that error text displays when field is submitted and required
    comp.submitted = true;
    comp.formFieldControl.markAsTouched();
    fixture.detectChanges();
    el = de.query(By.css('.form-field__error-text')).nativeElement;
    expect(el.innerText).toEqual('Please enter a value.');

    // verify that error text contains label when label is set
    comp.label = 'label';
    fixture.detectChanges();
    expect(el.innerText).toEqual('Please enter label.');
  }));

  it('should display correct input field type', async(() => {
    // verify that no input field displays for invalid type
    comp.type = null;
    fixture.detectChanges();
    expect(de.query(By.css('.form-field__input-section')).children.length).toEqual(0);

    // verify that standard html input field is used for text and number types
    comp.type = 'text';
    fixture.detectChanges();
    el = de.query(By.css('.form-field__input')).nativeElement;
    expect(el.getAttribute('type')).toEqual('text');
    comp.type = 'number';
    fixture.detectChanges();
    el = de.query(By.css('.form-field__input')).nativeElement;
    expect(el.getAttribute('type')).toEqual('number');

    // verify that angular material components are used for radio, checkbox, select and date types
    comp.type = 'radio';
    fixture.detectChanges();
    expect(de.query(By.css('mat-radio-group'))).toBeTruthy();
    comp.type = 'checkbox';
    fixture.detectChanges();
    expect(de.query(By.css('mat-checkbox'))).toBeTruthy();
    comp.type = 'select';
    fixture.detectChanges();
    expect(de.query(By.css('mat-select'))).toBeTruthy();
    comp.type = 'date';
    fixture.detectChanges();
    expect(de.query(By.css('mat-datepicker'))).toBeTruthy();
  }));

  it('should display correct placholder text', async(() => {
    // verify that placeholder is not present when unset
    fixture.detectChanges();
    el = de.query(By.css('.form-field__input')).nativeElement;
    expect(el.getAttribute('placeholder')).toEqual('');

    // verify that placeholder is set for text and number input types
    comp.placeholder = 'placeholder';
    fixture.detectChanges();
    el = de.query(By.css('.form-field__input')).nativeElement;
    expect(el.getAttribute('placeholder')).toEqual('placeholder');

    comp.type = 'number';
    fixture.detectChanges();
    el = de.query(By.css('.form-field__input')).nativeElement;
    expect(el.getAttribute('placeholder')).toEqual('placeholder');
  }));

  it('should clear form control when clear button is clicked', async(() => {
    // verify that input contains correct value when set
    comp.formFieldControl.setValue('abc');
    fixture.detectChanges();
    el = de.query(By.css('.form-field__input')).nativeElement;
    expect((<HTMLInputElement>el).value).toEqual('abc');

    // verify that correct values are set when clear function is called
    comp.clear();
    fixture.detectChanges();
    el = de.query(By.css('.form-field__input')).nativeElement;
    expect(comp.formFieldControl.value).toEqual('');
    expect((<HTMLInputElement>el).value).toEqual('');

    // verify that form control setValue function called when clear function is called
    spyOn(comp.formFieldControl, 'setValue');
    comp.clear();
    expect(comp.formFieldControl.setValue).toHaveBeenCalledWith('');

    // verify that clear function is called when clear icon is clicked
    spyOn(comp, 'clear');
    el = de.query(By.css('.form-field__input-clear')).nativeElement;
    el.click();
    expect(comp.clear).toHaveBeenCalled();
  }));

  it('should correctly validate date input', async(() => {
    comp.type = 'date';
    fixture.detectChanges();

    let date = 'abcxyz';
    let dateMoment = moment(date, 'MM/DD/YYYY');
    expect(comp['isStringDateInputValid'](date, dateMoment)).toBe(false);

    date = '12/06/1990';
    dateMoment = moment(date, 'MM/DD/YYYY');
    expect(comp['isStringDateInputValid'](date, dateMoment)).toBe(true);

    comp.processDate(dateMoment);
    expect(comp.dateInput.nativeElement.value).toEqual(date);
  }));
});
