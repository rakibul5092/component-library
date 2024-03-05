import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { InputFieldModule } from 'nextsapien-component-lib';
import { InputFieldTestComponent } from './input-field-test.component';

const routes: Route[] = [{ path: '', component: InputFieldTestComponent }];

@NgModule({
  declarations: [InputFieldTestComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes), InputFieldModule],
})
export class InputFieldTestModule {}
