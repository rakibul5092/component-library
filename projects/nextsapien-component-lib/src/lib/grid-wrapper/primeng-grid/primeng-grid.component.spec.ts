import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule } from '@ionic/angular';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslationModule } from '../../translation.module';
import { PrimeNgGridComponent } from './primeng-grid.component';

describe.skip('PrimeNgGridComponent', () => {
  let component: PrimeNgGridComponent;
  let fixture: ComponentFixture<PrimeNgGridComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [],
      declarations: [PrimeNgGridComponent],
      imports: [
        IonicModule.forRoot(),
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressBarModule,
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatTooltipModule,
        NoopAnimationsModule,
        TranslationModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PrimeNgGridComponent);
    component = fixture.componentInstance;
    component.columnDefs = [];
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
