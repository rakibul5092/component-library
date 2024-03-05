import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Route, RouterModule } from '@angular/router';
import { GridModule } from 'nextsapien-component-lib';
import { GridDemoComponent } from './grid-demo.component';
import { GridDemoService } from './grid-demo.service';

const routes: Route[] = [{ path: '', component: GridDemoComponent }];

@NgModule({
  declarations: [GridDemoComponent],
  imports: [CommonModule, FormsModule, GridModule, HttpClientModule, MatSlideToggleModule, RouterModule.forChild(routes)],
  providers: [GridDemoService],
})
export class GridDemoModule {}
