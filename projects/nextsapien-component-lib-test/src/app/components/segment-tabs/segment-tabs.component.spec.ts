import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentTabsComponent } from './segment-tabs.component';

describe('ProfileHeaderComponent', () => {
  let component: SegmentTabsComponent;
  let fixture: ComponentFixture<SegmentTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SegmentTabsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
