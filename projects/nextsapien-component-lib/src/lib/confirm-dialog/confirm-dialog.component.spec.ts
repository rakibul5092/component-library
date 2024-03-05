import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConfirmDialogComponent } from './confirm-dialog.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

export const createSpyObj = (baseName, methodNames): { [key: string]: jest.Mock<any> } => {
  const obj: any = {};

  for (let i = 0; i < methodNames.length; i++) {
    obj[methodNames[i]] = jest.fn();
  }

  return obj;
};

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  const matDialogSpy = createSpyObj('MatDialogRef', ['onNoClick', 'closeDialog']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmDialogComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: matDialogSpy,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
      ],
      imports: [MatDialogModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
