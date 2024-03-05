import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyFillUpDemoComponent } from './empty-fill-up-demo.component';

describe('EmptyFillUpDemoComponent', () => {
  let component: EmptyFillUpDemoComponent;
  let fixture: ComponentFixture<EmptyFillUpDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmptyFillUpDemoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyFillUpDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
