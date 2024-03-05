import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { TooltipDirectionPreference } from '../enums/tooltip-direction-preference';

@Component({
  selector: 'lib-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  animations: [
    trigger('tooltip', [transition(':enter', [style({ opacity: 0 }), animate(300, style({ opacity: 1 }))]), transition(':leave', [animate(300, style({ opacity: 0 }))])]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipComponent {
  @Input() message: SafeHtml = '';
  @Input() directionPreference: TooltipDirectionPreference = TooltipDirectionPreference.Bottom;

  public readonly directionPreferences = TooltipDirectionPreference;
}
