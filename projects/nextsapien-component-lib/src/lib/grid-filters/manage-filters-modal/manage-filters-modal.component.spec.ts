import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TooltipModule } from '../../tooltip/tooltip.module';
import { GridFilterService } from '../services/grid-filter.service';
import { ManageFiltersModalComponent } from './manage-filters-modal.component';

describe('ManageFiltersModalComponent', () => {
  let component: ManageFiltersModalComponent;
  let fixture: ComponentFixture<ManageFiltersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageFiltersModalComponent],
      imports: [CommonModule, TooltipModule, MatDialogModule],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }, { provide: MatDialogRef, useValue: { close: () => null } }, GridFilterService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFiltersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
