import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule } from '@ionic/angular';
import { AuthPageModule } from '../../auth/auth.module';

import { DefaultDataServiceConfig } from '@ngrx/data';
import { AuthService } from '../../auth/auth.service';
import { SharedService } from '../../shared/shared.service';
import { FileUploadComponent } from './file-upload.component';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FileUploadComponent],
      providers: [AuthService, { provide: DefaultDataServiceConfig, useClass: DefaultDataServiceConfig }, { provide: SharedService, useClass: SharedService }],
      imports: [IonicModule.forRoot(), AuthPageModule, HttpClientTestingModule, MatSnackBarModule, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
