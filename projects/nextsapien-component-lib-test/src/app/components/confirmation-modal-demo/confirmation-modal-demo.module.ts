import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Route, RouterModule } from '@angular/router';
import { ConfirmationModalDemoComponent } from './confirmation-modal-demo.component';

const routes: Route[] = [{ path: '', component: ConfirmationModalDemoComponent }];

@NgModule({
  declarations: [ConfirmationModalDemoComponent],
  imports: [CommonModule, FormsModule, MatSlideToggleModule, RouterModule.forChild(routes)],
})
export class ConfirmationModalDemoModule {}
