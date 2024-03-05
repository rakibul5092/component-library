import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationModalDemoComponent } from './confirmation-modal-demo.component';

describe('ConfirmationModalDemoComponent', () => {
  let component: ConfirmationModalDemoComponent;
  let fixture: ComponentFixture<ConfirmationModalDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmationModalDemoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationModalDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
