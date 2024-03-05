import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Route, RouterModule } from '@angular/router';
import { GridFiltersModule } from 'projects/nextsapien-component-lib/src/public-api';
import { GridFiltersDemoComponent } from './grid-filters-demo.component';

const routes: Route[] = [{ path: '', component: GridFiltersDemoComponent }];

@NgModule({
  declarations: [GridFiltersDemoComponent],
  imports: [CommonModule, FormsModule, MatSlideToggleModule, GridFiltersModule, RouterModule.forChild(routes)],
})
export class GridFiltersDemoModule {}
