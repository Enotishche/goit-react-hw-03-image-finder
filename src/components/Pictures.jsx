import { Component } from 'react';

import { getImages } from 'api/fetchAPI';
import Searchbar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';

class Pictures extends Component {
  state = {
    pictures: [],
    search: '',
    loading: false,
    page: 1,
    total: 0,
    error: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      try {
        this.setState({ loading: true });

        const data = await getImages(search, page);
        this.setState(({ pictures }) => ({
          pictures: [...pictures, ...data.hits],
          total: data.totalHits,
        }));
      } catch (error) {
        this.setState(error => error.message);
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  getImages = ({ search }) => {
    if (search !== this.state.value) {
      this.setState({ search, page: 1, pictures: [] });
    }
  };

  loadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  render() {
    const { pictures, error, loading, total } = this.state;
    const { getImages, loadMore } = this;
    const totalPage = pictures.length / total;
    return (
      <div>
        <Searchbar onSubmit={getImages} />
        <ImageGallery pictures={pictures} />
        {error && <p>There is nothing here. Try again later </p>}
        {totalPage < 1 && !loading && <Button onClick={loadMore} />}
        {loading && <Loader />}
      </div>
    );
  }
}
export default Pictures;
