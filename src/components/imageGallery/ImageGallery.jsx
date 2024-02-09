import { ImageGalleryItem } from '../imageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.module';

export const ImageGallery = ({ galleryItems }) => {
  return (
    <Gallery>
      {galleryItems.map(galleryItem => {
        return (
          <ImageGalleryItem key={galleryItem.id} galleryItem={galleryItem} />
        );
      })}
    </Gallery>
  );
};

export default ImageGallery;