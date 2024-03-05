export class ResizedEvent {
  public newRect: ResizeObserverSize;
  public oldRect?: DOMRectReadOnly;
  public isFirst: boolean;

  public constructor(newRect: ResizeObserverSize, oldRect: DOMRectReadOnly | undefined) {
    this.newRect = newRect;
    this.oldRect = oldRect;
    this.isFirst = oldRect == null;
  }
}
