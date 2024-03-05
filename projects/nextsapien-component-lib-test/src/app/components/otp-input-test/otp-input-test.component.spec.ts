import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpInputTestComponent } from './otp-input-test.component';

describe('OtpInputTestComponent', () => {
  let component: OtpInputTestComponent;
  let fixture: ComponentFixture<OtpInputTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtpInputTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OtpInputTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
