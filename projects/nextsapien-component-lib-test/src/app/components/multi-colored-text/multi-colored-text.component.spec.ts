import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MultiColoredTextComponent } from './multi-colored-text.component';

describe('MultiColoredTextComponent', () => {
  let component: MultiColoredTextComponent;
  let fixture: ComponentFixture<MultiColoredTextComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MultiColoredTextComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(MultiColoredTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
