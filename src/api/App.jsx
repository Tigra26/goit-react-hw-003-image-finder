import { Component } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import  PostsApiService  from './PostsApiService';
import  { AppContent } from './App.module';

import Searchbar from 'components/searchbar/Searchbar';
import Button from 'components/button/Button';
import Loader from 'components/loader/Loader';
import ImageGallery from 'components/imageGallery/ImageGallery';


const postApiService = new PostsApiService();

export class App extends Component {
  state = {
    searchQuery: ``,
    galleryItems: [],
    galleryPage: 1,

    loading: false,
    isButtonShow: false,
    error: true,
  };

  componentDidUpdate(_, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;
    const prevPage = prevState.galleryPage;
    const nextPage = this.state.galleryPage;

    if (prevQuery !== nextQuery) {
      this.setState({ galleryPage: 1, galleryItems: [], isButtonShow: false });
      if (nextPage === 1) {
        this.fetchGalleryItems(nextQuery, nextPage);
      }
    } else if (prevPage !== nextPage) {
      this.fetchGalleryItems(nextQuery, nextPage);
    }
  }

  fetchGalleryItems = (nextQuery, nextPage) => {
    this.setState({ loading: true, error: false });

    postApiService.query = nextQuery;
    postApiService.page = nextPage;

    postApiService.fetchPost().then(data => {
      postApiService.hits = data.totalHits;

      const newData = data.hits.map(
        ({ id, tags, webformatURL, largeImageURL }) => ({
          id,
          tags,
          webformatURL,
          largeImageURL,
        })
      );
      const currentData = [...this.state.galleryItems, ...newData];

      this.setState(prevState => ({
        galleryItems: [...prevState.galleryItems, ...newData],
      }));

      if (!data.totalHits) {
        this.setState({ loading: false, error: true });
        return toast.warn(
          'Please check the mistakes in typing and then try again.'
        );
      }

      if (currentData.length >= data.totalHits) {
        this.setState({
          loading: false,
          isButtonShow: false,
          error: false,
        });
        return;
      }

      if (nextPage === 1) {
        toast.success(`Well, we found ${postApiService.hits} images.`);
      }

      this.setState({
        loading: false,
        isButtonShow: true,
        error: false,
      });
    });
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      galleryPage: prevState.galleryPage + 1,
    }));
  };

  render() {
    const { galleryItems, loading, isButtonShow, error } = this.state;

    return (
      <AppContent>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {error && <h2>The field for search is still empty!</h2>}
        {!error && <ImageGallery galleryItems={galleryItems} />}
        {loading && <Loader />}
        {isButtonShow && <Button onClick={this.onLoadMore} />}

        <ToastContainer autoClose={2500} theme="dark" />
      </AppContent>
    );
  }
}