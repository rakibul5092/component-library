import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NativeElementInjectorDirective } from '../directives/native-element-injector/native-element-injector.directive';
import { TelInputComponent } from './tel-input.component';
import { MatRippleModule } from '@angular/material/core';
import {DirectiveModule} from "../directives/directive.module";
import {NgxMaskModule} from "ngx-mask";

@NgModule({
  declarations: [TelInputComponent, NativeElementInjectorDirective],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, BsDropdownModule.forRoot(), MatRippleModule, DirectiveModule, NgxMaskModule.forRoot()],
  exports: [TelInputComponent, NativeElementInjectorDirective],
})
export class TelInputModule {}
