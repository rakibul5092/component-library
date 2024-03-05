import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { TooltipModule } from '../../tooltip/tooltip.module';
import { FormFieldModule } from '../../form-field/form-field.module';
import { SelectFilterComponent } from './select-filter.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SearchBarModule } from '../../search-bar/search-bar.module';
import { CommonModule } from '@angular/common';

describe('SelectFilterComponent', () => {
  let component: SelectFilterComponent;
  let fixture: ComponentFixture<SelectFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectFilterComponent],
      imports: [
        CommonModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        TooltipModule,

        MatDividerModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,

        SearchBarModule,
        FormFieldModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
