import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImageAction, ImageModel } from './image.model';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss'],
})
export class ImageGalleryComponent {
  @Input() images: ImageModel[];
  @Output() imagesChange: EventEmitter<ImageModel[]> = new EventEmitter<ImageModel[]>();

  /**
   * on gallery image change
   * @param event
   */
  public handelImageAction(event: ImageAction) {
    switch (event.action) {
      case 'delete': {
        this.images[event.index].deleted = true;
        break;
      }
      case 'update': {
        if (event.image.label === 'imageUrl' || event.image.label === 'backPath') {
          this.images.forEach((image, index) => {
            if (image.label === event.image.label && index !== event.index) {
              image.label = 'active';
            }
          });
        }
        break;
      }
    }
  }
}
