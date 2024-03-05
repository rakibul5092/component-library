import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnManagementModalDemoComponent } from './column-management-modal-demo.component';
import { Route, RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { ColumnManagementModalModule } from 'nextsapien-component-lib';

const routes: Route[] = [{ path: '', component: ColumnManagementModalDemoComponent }];

@NgModule({
  declarations: [ColumnManagementModalDemoComponent],
  imports: [CommonModule, MatDialogModule, ColumnManagementModalModule, RouterModule.forChild(routes)],
})
export class ColumnManagementModalDemoModule {}
