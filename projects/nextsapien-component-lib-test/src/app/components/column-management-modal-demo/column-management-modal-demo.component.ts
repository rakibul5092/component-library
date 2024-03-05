import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColumnManagementData, ColumnManagementModalComponent } from 'nextsapien-component-lib';

@Component({
  selector: 'app-column-management-modal-demo',
  templateUrl: './column-management-modal-demo.component.html',
  styleUrls: ['./column-management-modal-demo.component.scss'],
})
export class ColumnManagementModalDemoComponent {
  constructor(private dialog: MatDialog) {}

  public open() {
    this.dialog.open(ColumnManagementModalComponent, {
      disableClose: true,
      width: '50vw',
      minWidth: '800px',
      maxHeight: '722px',
      data: {
        columns: [
          {
            label: 'Project Number',
            visible: false,
            name: 'projectnumber',
            groupName: 'Project Details',
          },
          {
            label: 'Project Name',
            visible: true,
            name: 'projectname',
            groupName: 'Project Details',
          },
          {
            label: 'Published Project Name',
            visible: true,
            name: 'publishedprojectname',
            groupName: 'Project Details',
          },
          {
            label: 'Firm Org Offices',
            visible: true,
            name: 'firmorgoffices',
            groupName: 'Firm Organization',
          },
          {
            label: 'Firm Org Divisions',
            visible: false,
            name: 'firmorgdivisions',
            groupName: 'Firm Organization',
          },
          {
            label: 'Project Status',
            visible: true,
            name: 'projectstatus',
            groupName: 'General Project Information',
          },
          {
            label: 'Financial Status',
            visible: true,
            name: 'financialstatus',
            groupName: 'General Project Information',
          },
        ],
      } as ColumnManagementData,
    });
  }
}
