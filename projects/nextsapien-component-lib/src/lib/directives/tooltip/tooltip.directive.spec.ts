import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { TooltipDirectionPreference } from '../../enums/tooltip-direction-preference';
import { TooltipComponent } from '../../tooltip/tooltip.component';
import { TooltipDirective } from './tooltip.directive';

@Component({
  template: ` <label style="position: fixed; top: 100px" [cosTooltip]="'Tooltip'" [directionPreference]="top" id="top">Text</label>
    <label [cosTooltip]="'Tooltip'" [directionPreference]="right" id="right">Text</label>
    <label [cosTooltip]="'Tooltip'" [directionPreference]="bottom" id="bottom">Text</label>
    <label [cosTooltip]="'Tooltip'" [directionPreference]="left" id="left">Text</label>`,
})
class HostComponent {
  top = TooltipDirectionPreference.Top;
  right = TooltipDirectionPreference.Right;
  bottom = TooltipDirectionPreference.Bottom;
  left = TooltipDirectionPreference.Left;
}

describe('TooltipDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [HostComponent, TooltipDirective, TooltipComponent],
      imports: [OverlayModule, CommonModule, BrowserModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).createComponent(HostComponent);

    fixture.detectChanges(); // initial binding
  });

  it('should get tooltip on top', fakeAsync(() => {
    fixture.whenStable().then(() => {
      const debugTag = fixture.debugElement.query(By.css('#top'));
      const InputEl = debugTag.nativeElement as HTMLElement;
      const directiveEl = fixture.debugElement.query(By.directive(TooltipDirective));
      expect(directiveEl).not.toBeNull();
      InputEl.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      tick(1010);

      const boundingRect = debugTag.nativeElement.getBoundingClientRect();
      const hasRoom = hasRoomToDisplay(boundingRect.bottom, 75, window.innerHeight, true);
      const str = !hasRoom ? 'tooltip-element--top' : 'tooltip-element--bottom';
      expect(InputEl.classList).toContain(str);
    });
  }));

  it('should get tooltip on right', fakeAsync(() => {
    fixture.whenStable().then(() => {
      const debugTag = fixture.debugElement.query(By.css('#right'));
      const InputEl = debugTag.nativeElement as HTMLElement;
      const directiveEl = fixture.debugElement.query(By.directive(TooltipDirective));
      expect(directiveEl).not.toBeNull();
      InputEl.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      tick(1010);
    });
  }));

  it('should get tooltip on bottom', fakeAsync(() => {
    fixture.whenStable().then(() => {
      const debugTag = fixture.debugElement.query(By.css('#bottom'));
      const InputEl = debugTag.nativeElement as HTMLElement;
      const directiveEl = fixture.debugElement.query(By.directive(TooltipDirective));
      expect(directiveEl).not.toBeNull();
      InputEl.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      tick(1010);
      expect(InputEl.classList).toContain('tooltip-element--bottom');
    });
  }));

  it('should get tooltip on left', fakeAsync(() => {
    fixture.whenStable().then(() => {
      tick(1010);
      const debugTag = fixture.debugElement.query(By.css('#left'));
      const InputEl = debugTag.nativeElement as HTMLElement;
      const directiveEl = fixture.debugElement.query(By.directive(TooltipDirective));
      expect(directiveEl).not.toBeNull();
      InputEl.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      tick(1010);
      const boundingRect = debugTag.nativeElement.getBoundingClientRect();
      const hasRoom = hasRoomToDisplay(boundingRect.bottom, 75, window.innerHeight, true);
      const str = !hasRoom ? 'tooltip-element--left' : 'tooltip-element--right';
      expect(InputEl.classList).toContain(str);
    });
  }));

  it('should remove tooltip on mouse leave', fakeAsync(() => {
    fixture.whenStable().then(() => {
      const debugTag = fixture.debugElement.query(By.css('#bottom'));
      const InputEl = debugTag.nativeElement as HTMLElement;
      const directiveEl = fixture.debugElement.query(By.directive(TooltipDirective));
      expect(directiveEl).not.toBeNull();
      InputEl.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      tick(1010);
      expect(InputEl.classList).toContain('tooltip-element--bottom');
      InputEl.dispatchEvent(new Event('mouseleave'));
      fixture.detectChanges();
      expect(InputEl.classList).not.toContain('tooltip-element--bottom');
    });
  }));

  it('should remove tooltip on click', fakeAsync(() => {
    fixture.whenStable().then(() => {
      const debugTag = fixture.debugElement.query(By.css('#right'));
      const InputEl = debugTag.nativeElement as HTMLElement;
      const directiveEl = fixture.debugElement.query(By.directive(TooltipDirective));
      expect(directiveEl).not.toBeNull();
      InputEl.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      tick(1010);
      expect(InputEl.classList).toContain('tooltip-element--right');
      InputEl.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      expect(InputEl.classList).not.toContain('tooltip-element--right');
    });
  }));
});
export function hasRoomToDisplay(position: number, minimumSpace: number, limit: number, isPositiveDirection: boolean) {
  if (isPositiveDirection) {
    return position + minimumSpace < limit;
  } else {
    return position - minimumSpace > limit;
  }
}
