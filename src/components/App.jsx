import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from './Button/Button';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import css from './App.module.css';
import { toast } from 'react-toastify';

const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    if (query !== '') {
      setImages([]);
      setPage(1);
      setIsLastPage(false);
      fetchImages();
    }
  }, [query]);

  const fetchImages = () => {
    const API_KEY = '36285780-5e432e43a01ab0bbeda1983f2';

    setIsLoading(true);

    axios
      .get(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then(response => {
        const { hits, totalHits } = response.data;

        if (hits.length === 0) {
          toast('Sorry, there are no images matching your request...', {
            position: toast.POSITION.TOP_CENTER,
          });
        }

        const modifiedHits = hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            tags,
            webformatURL,
            largeImageURL,
          })
        );

        setImages(prevImages => [...prevImages, ...modifiedHits]);
        setPage(prevPage => prevPage + 1);
        setIsLastPage(
          prevImages => prevImages.length + modifiedHits.length >= totalHits
        );
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSearchSubmit = query => {
    if (query === '') {
      return;
    }
    setQuery(query);
    setPage(1);
    setImages([]);
    setError(null);
    setIsLastPage(false);
  };

  const handleImageClick = image => {
    setSelectedImage(image);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const handleModalClose = () => {
    setSelectedImage(null);
    setShowModal(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSearchSubmit} />

      {error && <p>Błąd: {error}</p>}

      <ImageGallery images={images} onItemClick={handleImageClick} />

      {isLoading && <Loader />}

      {!isLoading && images.length > 0 && !isLastPage && (
        <Button onClick={fetchImages} />
      )}

      {showModal && <Modal image={selectedImage} onClose={handleModalClose} />}
    </div>
  );
};

export default App;
