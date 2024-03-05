import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IonicModule } from '@ionic/angular';
import { TranslationModule } from '../translation.module';

import { ImageGalleryComponent } from './image-gallery.component';
import { ImageComponent } from './image/image.component';

describe('ImageGalleryComponent', () => {
  let component: ImageGalleryComponent;
  let fixture: ComponentFixture<ImageGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageGalleryComponent, ImageComponent],
      imports: [HttpClientTestingModule, MatSlideToggleModule, MatIconModule, MatTooltipModule, IonicModule, TranslationModule],
    }).compileComponents();
    fixture = TestBed.createComponent(ImageGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
