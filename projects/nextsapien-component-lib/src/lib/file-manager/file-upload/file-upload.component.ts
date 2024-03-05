import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { DefaultDataServiceConfig } from '@ngrx/data';
import { SNACKBARTYPE } from '../../shared/constants';
import { HttpUtilService } from '../../shared/http-utils.service';
import { SharedService } from '../../shared/shared.service';
import { TranslationService } from '../../translation.service';
import { Image } from './image.model';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  @Input() uploadText: string = 'test';
  @Output() update = new EventEmitter<any>();
  @Output() updateLoading = new EventEmitter<any>();
  @Input() isDisabled: boolean = false;
  @Input() alreadyTotal = 0;
  @Input() webpConvert: boolean = false;
  @ViewChild('upload') fileInput: ElementRef;

  public loading = false;
  @Input() smallScreen: boolean = false;

  constructor(
    private httpUtilService: HttpUtilService,
    private sharedService: SharedService,
    protected config: DefaultDataServiceConfig,
    private translateService: TranslationService,
  ) {}

  public uploadFiles(event) {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const numberOfFiles = this.getValidNumberOfFiles(selectedFiles);
      const images: Image[] = [];
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          images.push({
            name: selectedFiles[i]['name'],
            type: selectedFiles[i]['type'],
            size: selectedFiles[i]['size'],
            webpConvert: this.webpConvert,
            content: e.target.result.split(',')[1],
          });
          if (images.length === numberOfFiles) {
            this.loading = true;
            this.updateLoading.emit(true);
            this.httpUtilService
              .postRequest(this.config.root + '/s3/upload', {
                files: images,
              })
              .subscribe(
                (result: any[]) => {
                  result.forEach((image) => this.update.emit({ url: image.url }));
                  this.translateService.get('SNACKBAR.FILE_UPLOAD_SUCCESSFUL').subscribe((translation) => this.sharedService.openSnackBar(translation, '', SNACKBARTYPE.success));
                  this.loading = false;
                  this.updateLoading.emit(false);
                  this.fileInput.nativeElement.value = '';
                },
                (error) => {
                  this.translateService.get('SNACKBAR.FILE_UPLOAD_ERROR').subscribe((translation) => this.sharedService.openSnackBar(translation, '', SNACKBARTYPE.error));
                  this.loading = false;
                  this.updateLoading.emit(false);
                },
              );
          }
        };
        reader.readAsDataURL(selectedFiles[i]);
      }
    }
  }

  private getValidNumberOfFiles(selectedFiles: any[]): number {
    let arr = [];
    if (selectedFiles.length + this.alreadyTotal > 8) {
      arr = Array.from(selectedFiles).splice(0, 8 - this.alreadyTotal);
      return arr.length;
    } else {
      return selectedFiles.length;
    }
  }
}
