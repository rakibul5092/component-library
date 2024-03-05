import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputFieldComponent } from './input-field.component';

@NgModule({
  declarations: [InputFieldComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [InputFieldComponent],
})
export class InputFieldModule {}
