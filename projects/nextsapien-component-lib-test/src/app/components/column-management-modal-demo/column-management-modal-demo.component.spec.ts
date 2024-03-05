import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColumnManagementModalDemoComponent } from './column-management-modal-demo.component';

describe('ColumnManagementModalDemoComponent', () => {
  let component: ColumnManagementModalDemoComponent;
  let fixture: ComponentFixture<ColumnManagementModalDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColumnManagementModalDemoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnManagementModalDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
