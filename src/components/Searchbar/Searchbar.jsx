import { Component } from 'react';
import { GoSearch } from 'react-icons/go';
import propTypes from 'prop-types';
import styles from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    search: '',
  };

  onSubmitSearchForm = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    if (this.state.search.trim() === '') {
      return alert('Searchfield is empty.');
    }
    onSubmit({ ...this.state });
    this.reset();
  };

  reset() {
    this.setState({ search: '' });
  }

  onChangeSearchForm = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { search } = this.state;
    const { onChangeSearchForm, onSubmitSearchForm } = this;
    return (
      <header className={styles.searchBar}>
        <form className={styles.searchForm} onSubmit={onSubmitSearchForm}>
          <button type="submit" className={styles.searchFormButton}>
            <span className={styles.searchFormLabel} aria-label="search"></span>
            <GoSearch size="25px" />
          </button>

          <input
            className={styles.searchFormInput}
            onChange={onChangeSearchForm}
            value={search}
            name="search"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
