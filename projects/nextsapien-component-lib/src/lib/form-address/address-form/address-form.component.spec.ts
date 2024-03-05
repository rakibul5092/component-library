import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IonicModule } from '@ionic/angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslationModule } from '../../translation.module';

import { AddressFormComponent } from './address-form.component';

describe('AddressFormComponent', () => {
  let component: AddressFormComponent;
  let fixture: ComponentFixture<AddressFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddressFormComponent],
      imports: [IonicModule.forRoot(), HttpClientTestingModule, NgSelectModule, TranslationModule, MatFormFieldModule, FormsModule, ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: 'environment', useValue: {} }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
