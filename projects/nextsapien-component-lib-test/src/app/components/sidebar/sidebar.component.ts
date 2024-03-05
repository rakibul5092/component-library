import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  componentItems: Array<{ route: string; text: string }>;
  directiveItems: Array<{ route: string; text: string }>;
  modelItems: Array<{ route: string; text: string }>;
  styleItems: Array<{ route: string; text: string }>;
  notificationItems: Array<{ route: string; text: string }>;

  constructor(private router: Router) {}

  ngOnInit() {
    this.componentItems = [
      { text: 'ConfirmationModal', route: 'confirmation-dialog' },
      { text: 'Checkbox', route: 'checkbox' },
      { text: 'Circle Progress', route: 'circle-progress' },
      { text: 'Multi Colored Text', route: 'multi-colored-text' },
      { text: 'Profile Card', route: 'profile-card' },
      { text: 'Profile Header', route: 'profile-header' },
      { text: 'Empty fill up', route: 'empty-fill-up' },
      { text: 'Grid', route: 'grid' },
      { text: 'Grid Filters', route: 'grid-filters' },
      { text: 'OTP Input', route: 'otp-input' },
      { text: 'Input Field', route: 'input-field' },
      { text: 'Tel Input', route: 'tel-input' },
    ];

    this.directiveItems = [];

    this.modelItems = [];

    this.styleItems = [
      { text: 'Segment Tabs', route: 'segment-tabs' },
      { text: 'Buttons', route: 'buttons' },
      { text: 'Inputs', route: 'inputs' },
      { text: 'Information-card', route: 'information-card' },
      { text: 'message-box', route: 'message-box' },
    ];
  }

  onNavigate(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
