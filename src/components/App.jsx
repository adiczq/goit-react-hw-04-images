import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Button from './Button/Button';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import css from './App.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLastPage, setIsLastPage] = useState(false);

  const fetchImages = useCallback(
    currentPage => {
      const API_KEY = '36285780-5e432e43a01ab0bbeda1983f2';

      setIsLoading(true);

      axios
        .get(
          `https://pixabay.com/api/?q=${query}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
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

          if (page === 1) {
            setImages(modifiedHits);
          } else {
            setImages(prevImages => [...prevImages, ...modifiedHits]);
          }

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
    },
    [query, page]
  );

  useEffect(() => {
    console.log('useEffect - Before fetchImages: query:', query, 'page:', page);
    if (query !== '') {
      setImages([]);
      setIsLastPage(false);
      fetchImages(page);
    }
    console.log('useEffect - After fetchImages: query:', query, 'page:', page);
  }, [query, page, fetchImages]);
  useEffect(() => {
    console.log('Current page:', page);
  }, [page]);
  const handleSearchSubmit = newQuery => {
    if (newQuery === query) {
      return;
    }
    setQuery(newQuery);
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

  const handleLoadMore = () => {
    console.log('Before setPage:', page);
    const nextPage = page + 1;
    setPage(nextPage);

    fetchImages(nextPage);

    console.log('After setPage:', nextPage);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSearchSubmit} />

      {error && <p>Error: {error}</p>}

      <ImageGallery images={images} onItemClick={handleImageClick} />

      {isLoading && <Loader />}

      {!isLoading && images.length > 0 && !isLastPage && (
        <Button onClick={handleLoadMore} />
      )}

      {showModal && <Modal image={selectedImage} onClose={handleModalClose} />}

      <ToastContainer />
    </div>
  );
};

export default App;
