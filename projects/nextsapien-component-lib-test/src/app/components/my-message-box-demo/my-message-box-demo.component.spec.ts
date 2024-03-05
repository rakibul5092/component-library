import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMessageBoxDemoComponent } from './my-message-box-demo.component';

describe('MyMessageBoxDemoComponent', () => {
  let component: MyMessageBoxDemoComponent;
  let fixture: ComponentFixture<MyMessageBoxDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyMessageBoxDemoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMessageBoxDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
