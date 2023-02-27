import { Component } from 'react';
import { createPortal } from 'react-dom';
import propTypes from 'prop-types';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleCloseByEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleCloseByEsc);
  }

  handleCloseByEsc = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleCloseByOverlay = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props;
    return createPortal(
      <div className={styles.overlay} onClick={this.handleCloseByOverlay}>
        <div className={styles.modal}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;

Modal.propTypes = {
  largeImageURL: propTypes.string.isRequired,
  tags: propTypes.string,
  onClose: propTypes.func.isRequired,
};
