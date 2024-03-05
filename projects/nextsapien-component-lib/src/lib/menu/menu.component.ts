import { Location } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

export interface menuItem {
  name: string;
  link: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit {
  public activeIndex: number = 0;
  @Input() menuItems: menuItem[];
  @Input() contentId: string;
  @Input() logo: string;
  @Input() isDefault: boolean = true;

  constructor(private location: Location, private router: Router, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        this.observeCurrentPath();
      }
    });
    this.observeCurrentPath();
  }

  private observeCurrentPath() {
    const fullPath = this.location.path();
    if (this.menuItems && this.menuItems.length > 0) {
      this.activeIndex = fullPath === '' || fullPath === '/' ? 0 : this.menuItems.findIndex((item) => item.link === fullPath);
      this.changeDetectorRef.detectChanges();
    }
  }
}
