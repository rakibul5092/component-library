import { FlexibleConnectedPositionStrategy, Overlay, OverlayPositionBuilder, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Directive, ElementRef, HostListener, Input, OnDestroy, Renderer2 } from '@angular/core';
import { TooltipDirectionPreference } from '../../enums/tooltip-direction-preference';
import { TooltipComponent } from '../../tooltip/tooltip.component';

@Directive({
  selector: '[cosTooltip]',
})
export class TooltipDirective implements OnDestroy {
  private overlayRef: OverlayRef;
  private delayTimer;

  private readonly minimumVerticalSpaceNeeded = 75;

  private readonly minimumHorizontalSpaceNeeded = 313;

  private readonly tooltipOffsetAmount = 12;

  @Input() cosTooltip = '';
  @Input() cosDelayTime = 1000;
  @Input() directionPreference = TooltipDirectionPreference.Bottom;

  @HostListener('mouseenter')
  mouseEnter() {
    this.delayTimer = setTimeout(() => {
      if (this.cosTooltip) {
        this.show();
      }
    }, this.cosDelayTime);
  }

  @HostListener('mouseleave')
  mouseOut() {
    this.hide();
  }

  @HostListener('click')
  onClick() {
    this.hide();
  }

  constructor(private elementRef: ElementRef, private overlay: Overlay, private overlayPositionBuilder: OverlayPositionBuilder, private renderer: Renderer2) {}

  ngOnDestroy() {
    clearTimeout(this.delayTimer);
    if (this.overlayRef) {
      this.overlayRef.detach();
    }
  }

  private show() {
    switch (this.directionPreference) {
      case TooltipDirectionPreference.Top:
        this.handleTopShow();
        break;
      case TooltipDirectionPreference.Bottom:
        this.handleBottomShow();
        break;
      case TooltipDirectionPreference.Left:
        this.handleLeftShow();
        break;
      case TooltipDirectionPreference.Right:
        this.handleRightShow();
        break;
    }
  }

  private handleBottomShow(): void {
    const boundingRect: ClientRect = this.getBoundingRect();
    const hasRoom = this.hasRoomToDisplay(boundingRect.bottom, this.minimumVerticalSpaceNeeded, window.innerHeight, true);
    const posStrat: PositionStrategy = this.generateVerticalPosition(hasRoom ? false : true);
    this.applyPositionStrategy(posStrat);
    this.applyCarotClass(hasRoom ? 'bottom' : 'top');
    this.setComponentVariables(this.createComponentRef(), this.directionPreference);
  }

  private applyPositionStrategy(positionStrategy: PositionStrategy): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
    }
    this.overlayRef = this.overlay.create({ positionStrategy });
  }

  private applyCarotClass(tailClassName: string): void {
    this.renderer.addClass(this.elementRef.nativeElement, `tooltip-element--${tailClassName}`);
  }

  private handleTopShow(): void {
    const boundingRect: ClientRect = this.getBoundingRect();
    const hasRoom = this.hasRoomToDisplay(boundingRect.top, this.minimumVerticalSpaceNeeded, 0, false);
    const posStrat: PositionStrategy = this.generateVerticalPosition(hasRoom ? true : false);
    this.applyPositionStrategy(posStrat);
    this.applyCarotClass(hasRoom ? 'top' : 'bottom');
    this.setComponentVariables(this.createComponentRef(), this.directionPreference);
  }

  private handleLeftShow(): void {
    const boundingRect: ClientRect = this.getBoundingRect();
    const hasRoom = this.hasRoomToDisplay(boundingRect.left, this.minimumHorizontalSpaceNeeded, 0, false);
    const posStrat: PositionStrategy = this.generateHorizontalPosition(hasRoom ? false : true);
    this.applyPositionStrategy(posStrat);
    this.applyCarotClass(hasRoom ? 'left' : 'right');
    this.setComponentVariables(this.createComponentRef(), this.directionPreference);
  }

  private handleRightShow(): void {
    const boundingRect: ClientRect = this.getBoundingRect();
    const hasRoom = this.hasRoomToDisplay(boundingRect.right, this.minimumHorizontalSpaceNeeded, window.innerWidth, true);
    const posStrat: PositionStrategy = this.generateHorizontalPosition(hasRoom ? true : false);
    this.applyPositionStrategy(posStrat);
    this.applyCarotClass(hasRoom ? 'right' : 'left');
    this.setComponentVariables(this.createComponentRef(), this.directionPreference);
  }

  private getBoundingRect(): ClientRect {
    return this.elementRef.nativeElement.getBoundingClientRect();
  }

  private createComponentRef(): ComponentRef<TooltipComponent> {
    const tooltipPortal = new ComponentPortal(TooltipComponent);
    const tooltipRef: ComponentRef<TooltipComponent> = this.overlayRef.attach(tooltipPortal);
    return tooltipRef;
  }

  private setComponentVariables(compRef: ComponentRef<TooltipComponent>, directionPreference: TooltipDirectionPreference) {
    compRef.instance.message = this.cosTooltip;
    compRef.instance.directionPreference;
  }

  private hide(): void {
    clearTimeout(this.delayTimer);
    if (this.overlayRef) {
      this.overlayRef.detach();
    }
    this.renderer.removeClass(this.elementRef.nativeElement, 'tooltip-element--top');
    this.renderer.removeClass(this.elementRef.nativeElement, 'tooltip-element--bottom');
    this.renderer.removeClass(this.elementRef.nativeElement, 'tooltip-element--left');
    this.renderer.removeClass(this.elementRef.nativeElement, 'tooltip-element--right');
  }

  private hasRoomToDisplay(position: number, minimumSpace: number, limit: number, isPositiveDirection: boolean) {
    if (isPositiveDirection) {
      return position + minimumSpace < limit;
    } else {
      return position - minimumSpace > limit;
    }
  }

  private generateVerticalPosition(top: boolean): FlexibleConnectedPositionStrategy {
    return this.overlayPositionBuilder.flexibleConnectedTo(this.elementRef).withPositions([
      {
        originX: 'center',
        originY: top ? 'top' : 'bottom',
        overlayX: 'center',
        overlayY: top ? 'bottom' : 'top',
        offsetX: 0,
        offsetY: top ? -this.tooltipOffsetAmount : this.tooltipOffsetAmount,
      },
    ]);
  }

  private generateHorizontalPosition(right: boolean): FlexibleConnectedPositionStrategy {
    return this.overlayPositionBuilder.flexibleConnectedTo(this.elementRef).withPositions([
      {
        originX: right ? 'end' : 'start',
        originY: 'center',
        overlayX: right ? 'start' : 'end',
        overlayY: 'center',
        offsetX: right ? this.tooltipOffsetAmount : -this.tooltipOffsetAmount,
        offsetY: 0,
      },
    ]);
  }
}
