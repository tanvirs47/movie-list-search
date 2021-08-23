import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Loader from '../../components/Loader/Loader';
import Movie from '../../components/Movie/Movie';
import movieService from '../../resources/movie.resource';
import './Home.scss';

class Home extends Component {
  state = {
    movies: [],
    page: 1,
    total_pages: 2,
    loading: true,
    query: '',
  };
  async componentDidMount() {
    console.log('Pepe');
    await this.getMovies(true);
  }
  render() {
    return (
      <div className='Home'>
        <Header onChangeQuery={this.changeQueryHandler.bind(this)}></Header>
        {this.state.loading ? <Loader color={'#61DAFB'}></Loader> : null}
        {!this.state.loading && !this.state.movies.length ? (
          <h2 style={{ textAlign: 'center', color: '#fff' }}>
            No movies for this query: "{this.state.query}"
          </h2>
        ) : null}
        <div className='main'>
          {this.state.movies.map((movie, index) => {
            return <Movie movie={movie} key={index} />;
          })}
          <div className='load-more'>
            {this.state.page < this.state.total_pages ? (
              <button
                onClick={this.onLoadMore.bind(this)}
                disabled={this.state.loading}
              >
                {'Load more...'}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
  async getMovies(initial = false) {
    try {
      this.setState({ ...this.state, loading: true });
      let data = await movieService.getMovies({
        page: this.state.page,
        sort_by: 'popularity.desc',
      });
      let new_movies = initial
        ? data.results
        : [...this.state.movies, ...data.results];
      this.setState({
        ...this.state,
        movies: new_movies,
        total_pages: data.total_pages,
        loading: false,
      });
    } catch (error) {
      this.setState({ ...this.state, loading: false });
      alert(error.message);
    }
  }
  async getSearchMovie() {
    try {
      this.setState({ ...this.state, loading: true });
      let data = await movieService.searchMovies({
        page: this.state.page,
        query: this.state.query,
        sort_by: 'popularity.desc',
      });
      let new_movies = [...this.state.movies, ...data.results];
      this.setState({
        ...this.state,
        movies: new_movies,
        loading: false,
        total_pages: data.total_pages,
      });
    } catch (error) {
      this.setState({ ...this.state, loading: true });
      alert(error.message);
    }
  }
  onLoadMore() {
    let newState = { ...this.state, page: this.state.page + 1 };
    this.setState(newState, () => {
      if (!this.state.query) {
        this.getMovies();
      } else {
        this.getSearchMovie();
      }
    });
  }
  changeQueryHandler(text) {
    if (text && text.length > 2) {
      this.setState({ ...this.state, query: text, movies: [], page: 1 }, () => {
        this.getSearchMovie();
      });
    } else if (text && text.length <= 2) {
      /**Nothing to do avoiding searching */
    } else {
      this.setState({ ...this.state, query: text, movies: [], page: 1 }, () => {
        this.getMovies();
      });
    }
  }
}
export default Home;
