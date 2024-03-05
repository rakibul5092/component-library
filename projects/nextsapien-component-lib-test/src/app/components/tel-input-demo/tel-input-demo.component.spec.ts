import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelInputDemoComponent } from './tel-input-demo.component';

describe('TelInputDemoComponent', () => {
  let component: TelInputDemoComponent;
  let fixture: ComponentFixture<TelInputDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TelInputDemoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TelInputDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
