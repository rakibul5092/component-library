import { Component, Inject } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditorWrapperComplete } from '../../model/editor-wrapper-complete';

@Component({
  selector: 'lib-editor-wrapper',
  templateUrl: `./editor-wrapper.component.html`,
  styleUrls: [`./editor-wrapper.component.scss`],
})
export class EditorWrapperComponent {
  title: string;
  formFieldControl: UntypedFormControl;
  initConfig = {
    height: 250,
    menubar: false,
    toolbar: 'code | undo redo | bold italic underline | numlist bullist | cut copy paste pastetext | link unlink',
    theme_advanced_buttons3_add: 'save',
    plugins: 'code link lists paste',
  };
  apiKey = 'i44u01ej3c8a8red3akat8zybytxm8npvmyvmwzmov78gnto';

  constructor(public dialogRef: MatDialogRef<EditorWrapperComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.formFieldControl = data.formFieldControl;
    this.title = data?.title ?? 'Edit Notes';
  }

  close() {
    this.dialogRef.close({ cancel: true } as EditorWrapperComplete);
  }

  save() {
    this.dialogRef.close({ value: this.formFieldControl.value } as EditorWrapperComplete);
  }
}
