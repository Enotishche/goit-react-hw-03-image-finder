import { Component } from 'react';
import propTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import styles from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  state = {
    isOpen: false,
  };

  handleModal = () => {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
  };

  render() {
    const { webformatURL, largeImageURL, tags } = this.props;
    return (
      <li className={styles.imageGalleryItem}>
        <img
          src={webformatURL}
          alt={tags}
          source={largeImageURL}
          className={styles.imageGalleryItemImage}
          onClick={this.handleModal}
        />
        {this.state.isOpen && (
          <Modal largeImageURL={largeImageURL} onClose={this.handleModal} />
        )}
      </li>
    );
  }
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: propTypes.string.isRequired,
  largeImageURL: propTypes.string.isRequired,
  tags: propTypes.string.isRequired,
};
