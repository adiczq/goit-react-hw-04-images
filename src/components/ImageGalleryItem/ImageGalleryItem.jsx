import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  handleClick = () => {
    const { onClick, image } = this.props;
    if (onClick) {
      onClick(image);
    }
  };

  render() {
    const { image } = this.props;
    return (
      <li className={css.ImageGalleryItem} onClick={this.handleClick}>
        <img src={image.webformatURL} alt={image.tags} />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
