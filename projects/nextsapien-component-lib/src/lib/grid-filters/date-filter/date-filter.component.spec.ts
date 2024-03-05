import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { DateFilterComponent } from './date-filter.component';
import { CommonModule } from '@angular/common';

describe('DateFilterComponent', () => {
  let component: DateFilterComponent;
  let fixture: ComponentFixture<DateFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DateFilterComponent],
      imports: [CommonModule, NoopAnimationsModule, ReactiveFormsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatMomentDateModule],
      providers: [
        {
          provide: MAT_DATE_FORMATS,
          useValue: {
            display: { dateInput: '' },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
