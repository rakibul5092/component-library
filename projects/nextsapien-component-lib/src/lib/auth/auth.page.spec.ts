import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { AuthPage } from './auth.page';

describe('AuthPage', () => {
  let component: AuthPage;
  let fixture: ComponentFixture<AuthPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AuthPage],
      imports: [IonicModule.forRoot(), RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
