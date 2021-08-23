import React from 'react';
import './MovieSummarize.scss';
import movieService from '../../../resources/movie.resource';
import { useHistory } from "react-router-dom";

const MovieSummarize = ({ movie }) => {
  let history = useHistory();
  function handleClick() {
    history.push("/");
  }
  return (
    <div
      className='MovieSummarize'
      style={{
        backgroundImage: `url(${movieService.IMAGE_URL + movie.backdrop_path})`,
      }}
    >
      <div className='info-layout container'>
        <div className='poster'>
          <img
            src={movieService.IMAGE_URL + movie.poster_path}
            alt={movie.original_title}
          />
        </div>
        <div className='movie-info'>
          <h2 className='title'>
            {movie.title}
            <span className='date'> ({formatDate(movie.release_date)})</span>
          </h2>
          <ul className='genres'>
            <i className='fas fa-dot-circle mr-2'></i>
            {movie.genres.map((genre, index) => {
              return (
                <React.Fragment key={index}>
                  {index < movie.genres.length - 1 ? (
                    <li key={genre.id}>{genre.name + ','}</li>
                  ) : (
                    <li key={genre.id}>{genre.name}</li>
                  )}
                </React.Fragment>
              );
            })}
          </ul>
          <ul className='genres'>
            <i className='far fa-clock mr-2'></i>
            <li>{formatTime(movie.runtime)}</li>
          </ul>
          <br></br>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <br></br>
          <div className='meta w-100'>
            <div>
              <p className='mb-0' style={{ fontWeight: 'bold' }}>
                Status
              </p>
              <p>{movie.status}</p>
            </div>
            <div>
              <p className='mb-0' style={{ fontWeight: 'bold' }}>
                Main language
              </p>
              <p>{movie.original_language}</p>
            </div>
            <div>
              <p className='mb-0' style={{ fontWeight: 'bold' }}>
              Income
              </p>
              <p>${movie.revenue}</p>
            </div>
          </div>
        </div>
        <button class="btn btn-primary" onClick={handleClick}>Back</button>
      </div>
    </div>
  );

  function formatDate(date) {
    return new Date(date).getFullYear();
  }
  function formatTime(time) {
    let hours = Math.floor(time / 60);
    let minutes = time % 60;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}h:${minutes}m`;
  }
};
export default MovieSummarize;
