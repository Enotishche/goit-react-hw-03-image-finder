import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import propTypes from 'prop-types';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ pictures }) => {
  return (
    <ul className={styles.imageGallery}>
      {pictures.map(({ id, largeImageURL, webformatURL, tags }) => {
        return (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
          />
        );
      })}
    </ul>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  pictures: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      largeImageURL: propTypes.string.isRequired,
      webformatURL: propTypes.string.isRequired,
      tags: propTypes.string.isRequired,
    })
  ),
};
