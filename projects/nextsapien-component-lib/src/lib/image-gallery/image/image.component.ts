import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { ImageAction, ImageModel } from '../image.model';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  animations: [
    trigger('cardFlip', [
      state('default', style({ transform: 'none' })),
      state('flipped', style({ transform: 'rotateY(180deg)' })),
      state('matched', style({ visibility: 'false', transform: 'scale(0.05)', opacity: 0 })),
      transition('default => flipped', [animate('400ms')]),
      transition('flipped => default', [animate('400ms')]),
      transition('* => matched', [animate('400ms')]),
    ]),
  ],
})
export class ImageComponent {
  @Input() image: ImageModel;
  @Input() imageIndex: number;
  @Output() imageAction: EventEmitter<ImageAction> = new EventEmitter<any>();
  public state = 'default';
  public deleteClickedCount = 0;
  public labels: any[] = [
    { title: 'GALLERY.FRONT_IMAGE', value: 'imageUrl' },
    { title: 'GALLERY.BACK_IMAGE', value: 'backPath' },
    { title: 'GALLERY.ACTIVE', value: 'active' },
  ];

  constructor(@Inject('environment') private environment) {}

  get imagePath() {
    return this.environment.s3Url + this.image.url;
  }

  public deleteImage() {
    this.imageAction.emit({ action: 'delete', image: this.image, index: this.imageIndex });
  }

  public updateImage(label, event) {
    this.image.label = event.checked ? label : 'Inactive';
    this.image.active = this.image.label !== 'Inactive';
    this.imageAction.emit({ action: 'update', image: this.image, index: this.imageIndex });
  }

  public getImageLabel(): string {
    const selectedLabel = this.image.label ? this.labels.find((label) => label.value === this.image.label) : null;
    return selectedLabel ? selectedLabel.title : 'GALLERY.INACTIVE';
  }
}
