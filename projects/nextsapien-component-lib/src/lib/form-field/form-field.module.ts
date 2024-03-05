import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { EditorModule } from '@tinymce/tinymce-angular';
import { PipeModule } from '../pipes/pipe.module';
import { SearchBarModule } from '../search-bar/search-bar.module';
import { TooltipModule } from '../tooltip/tooltip.module';
import { FormFieldComponent } from './form-field.component';

@NgModule({
  declarations: [FormFieldComponent],
  exports: [FormFieldComponent],
  imports: [
    CommonModule,
    PipeModule,
    EditorModule,
    FormsModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatMomentDateModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    SearchBarModule,
    TooltipModule,
  ],
})
export class FormFieldModule {}
