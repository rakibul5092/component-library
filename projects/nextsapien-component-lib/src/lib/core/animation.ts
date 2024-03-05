import { animate, group, state, style, transition, trigger } from '@angular/animations';

export const SlideInOutAnimation = [
  trigger('slideInOut', [
    state(
      'in',
      style({
        height: 'fit-content',
      }),
    ),
    state(
      'out',
      style({
        height: '0px',
      }),
    ),
    transition('in => out', [
      group([
        // animate('400ms ease-in-out', style({
        //     'opacity': '0'
        // })),
        // animate('600ms ease-in-out', style({
        //     'max-height': '0px'
        // })),
        animate(
          '400ms ease-in-out',
          style({
            height: '0px',
          }),
        ),
      ]),
    ]),
    transition('out => in', [
      group([
        // animate('1ms ease-in-out', style({
        //     'visibility': 'visible'
        // })),
        // animate('600ms ease-in-out', style({
        //     'max-height': 'unset'
        // })),
        animate(
          '500ms ease-in-out',
          style({
            height: 'fit-content',
          }),
        ),
      ]),
    ]),
  ]),
];
