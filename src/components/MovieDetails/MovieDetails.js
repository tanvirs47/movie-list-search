import React, { Component } from 'react';
import Loader from '../../components/Loader/Loader';
import './MovieDetails.scss';
import movieService from '../../resources/movie.resource';
import MovieSummarize from './components/MovieSummarize';

class MovieDetails extends Component {
  state = {
    movieId: '',
    movie: null,
    loading: true,
    error: null,
  };
  componentDidMount() {
    let params = this.props.match.params;
    this.initTheView(params.movieId);
  }
  async initTheView(movieId) {
    this.setState({ movieId: movieId });
    try {
      let [movie] = await Promise.all([movieService.getMovieById(movieId)]);
      this.setState({ movie });
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false, error: error.message || 'Error' });
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.loading ? <Loader color={'#61DAFB'} /> : null}
        {!this.state.error && !this.state.loading  ? (
          <div className='MovieDetails'>
            <MovieSummarize movie={this.state.movie} />
          </div>
        ) : null}
        {this.state.error ? (
          <h3 className='error'>
            Upps, Sorry we got an error: <span>"{this.state.error}"</span>
          </h3>
        ) : null}
      </React.Fragment>
    );
  }
}
export default MovieDetails;
