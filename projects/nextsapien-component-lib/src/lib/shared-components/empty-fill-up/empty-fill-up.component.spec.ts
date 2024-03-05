import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyFillUpComponent } from './empty-fill-up.component';

describe('EmptyFillUpComponent', () => {
  let component: EmptyFillUpComponent;
  let fixture: ComponentFixture<EmptyFillUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmptyFillUpComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyFillUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
