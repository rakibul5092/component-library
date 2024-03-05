import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessCheckmarkComponent } from './success-checkmark.component';

describe('SuccessCheckmarComponent', () => {
  let component: SuccessCheckmarkComponent;
  let fixture: ComponentFixture<SuccessCheckmarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuccessCheckmarkComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessCheckmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
