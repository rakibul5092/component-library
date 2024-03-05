import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule } from '@ionic/angular';
import { TranslationModule } from '../../translation.module';
import { ImageComponent } from './image.component';

describe('ImageComponent', () => {
  let component: ImageComponent;
  let fixture: ComponentFixture<ImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: 'environment',
          useValue: {
            s3url: '',
          },
        },
      ],
      declarations: [ImageComponent],
      imports: [HttpClientTestingModule, NoopAnimationsModule, MatSlideToggleModule, MatIconModule, MatTooltipModule, IonicModule, TranslationModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageComponent);
    component = fixture.componentInstance;
    component.image = {
      url: 'string',
      label: 'string',
      active: true,
      deleted: false,
      transient: true,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
