import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { TooltipComponent } from './tooltip.component';

xdescribe('TooltipComp', () => {
  let comp: TooltipComponent;
  let fixture: ComponentFixture<TooltipComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TooltipComponent],
      imports: [BrowserModule],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TooltipComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
        fixture.detectChanges();
      });
  }));

  it('should display message text', async(() => {
    comp.message = 'message text';
    fixture.detectChanges();

    el = de.query(By.css('.tooltip')).nativeElement;
    expect(el.innerText).toEqual('message text');
  }));
});
