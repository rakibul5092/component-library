export interface ImageModel {
  url: string;
  label: string;
  active: boolean;
  deleted: boolean;
  transient: boolean;
}
export interface ImageAction {
  action: string;
  image: ImageModel;
  index: number;
}
