import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DefaultDataServiceConfig } from '@ngrx/data';
import { of } from 'rxjs';
import { SharedService } from '../shared/shared.service';
import { TranslationModule } from '../translation.module';
import { FileManagerService } from './file-manager.service';

describe('FileManagerService', () => {
  let fileManagerService: FileManagerService;
  let mockResponse: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule, TranslationModule],
      providers: [FileManagerService, DefaultDataServiceConfig, SharedService],
    });
    fileManagerService = TestBed.inject(FileManagerService);
  });

  it('Should create instance', () => {
    expect(fileManagerService).toBeTruthy();
  });

  it('should do deleteFileFromAWS', () => {
    jest.spyOn(fileManagerService, 'deleteFileFromAWS').mockReturnValue(of(mockResponse));
    let response: any;
    fileManagerService.deleteFileFromAWS('https://mock-api.com').subscribe((res) => (response = res));
    expect(response).toEqual(mockResponse);
  });

  it('should do deleteFileBulkFromAWS', () => {
    jest.spyOn(fileManagerService, 'deleteFileBulkFromAWS').mockReturnValue(of(mockResponse));
    let response: any;
    fileManagerService.deleteFileBulkFromAWS([]).subscribe((res) => (response = res));
    expect(response).toEqual(mockResponse);
  });
});
