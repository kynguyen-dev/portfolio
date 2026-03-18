export interface GalleryPhoto {
  id: string;
  src: string;
  thumbSrc: string;
  width: number;
  height: number;
  author: string;
  color: string;
}

export interface GalleryStats {
  totalPhotos: number;
  renderedPhotos: number;
  fps: number;
  memSaved: string;
}
