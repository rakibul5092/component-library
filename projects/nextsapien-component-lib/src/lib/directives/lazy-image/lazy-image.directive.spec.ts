import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LazyImageDirective } from './lazy-image.directive';

@Component({
  template: ` <img class="eager" src="https://picsum.photos/id/237/200/300" loading="eager" />
    <img class="not-specified" src="https://picsum.photos/id/237/200/300" />`,
})
class HostComponent {}

describe('LazyImageDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [HostComponent, LazyImageDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).createComponent(HostComponent);

    fixture.detectChanges(); // initial binding
  });

  it('should return ok', () => {
    fixture.whenStable().then(() => {
      const inputDebug = fixture.debugElement.query(By.css('.eager'));
      const inputEl = inputDebug.nativeElement as HTMLImageElement;
      expect(inputEl.getAttribute('loading')).toBe('eager');
    });
  });

  it('should return lazy', () => {
    fixture.whenStable().then(() => {
      const inputDebug = fixture.debugElement.query(By.css('.not-specified'));
      const inputEl = inputDebug.nativeElement as HTMLImageElement;
      const supports = 'loading' in HTMLImageElement.prototype;
      const output = supports ? 'eager' : null;
      expect(inputEl.getAttribute('loading')).toBe(output);
    });
  });
});
