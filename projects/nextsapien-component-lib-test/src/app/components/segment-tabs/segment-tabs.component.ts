import { Component } from '@angular/core';

@Component({
  selector: 'app-segment-tabs',
  templateUrl: './segment-tabs.component.html',
  styleUrls: ['./segment-tabs.component.scss'],
})
export class SegmentTabsComponent {
  public tabs1 = ['Your Clients', 'Client Requests'];
  public tabs2: any[] = ['context', 'events', 'schedules', 'basic info', 'particulars', 'orders'];

  public selectedTab1 = 'Your Clients';
  public selectedTab2 = 'schedules';
}
