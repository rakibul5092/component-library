import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFieldTestComponent } from './input-field-test.component';

describe('InputFieldTestComponent', () => {
  let component: InputFieldTestComponent;
  let fixture: ComponentFixture<InputFieldTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputFieldTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputFieldTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
