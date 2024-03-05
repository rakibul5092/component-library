import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DirectiveModule } from '../../../directives/directive.module';

import { OtpInputComponent } from './otp-input.component';

describe('OtpInputComponent', () => {
  let component: OtpInputComponent;
  let fixture: ComponentFixture<OtpInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtpInputComponent],
      imports: [DirectiveModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
