import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { nanoid } from 'nanoid';

const ImageGallery = ({ images, onItemClick }) => {
  return (
    <ul className={css.ImageGallery}>
      {images.map(({ webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={nanoid()} // Używamy nanoid do generowania unikalnych kluczy
          image={{
            webformatURL: webformatURL,
            tags: tags,
            largeImageURL: largeImageURL,
          }}
          onClick={onItemClick}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default ImageGallery;
