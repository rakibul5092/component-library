import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaveProgressComponent } from './wave-progress.component';

describe('WaveComponent', () => {
  let component: WaveProgressComponent;
  let fixture: ComponentFixture<WaveProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WaveProgressComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaveProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
