/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const API_URL = 'https://api.themoviedb.org/3/discover/movie';
const IMAGE_URL = 'http://image.tmdb.org/t/p/w500';
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie';
const URL_MOVIE = 'https://api.themoviedb.org/3/movie';

async function getMovies(params = { page: 1 }, language = 'en') {
  const response = await axios.get(API_URL, {
    params: {
      ...params,
      language,
    },
  });
  let { data } = response;
  data.results = data.results.filter((element) => {
    return element.vote_average > 0 && element.poster_path;
  });
  data.results = data.results.map((element) => {
    element.image = `${IMAGE_URL}${element.poster_path}`;
    element.rating = element.vote_average;
    return element;
  });
  return data;
}

async function searchMovies(params = { page: 1 }, language = 'en') {
  const response = await axios.get(SEARCH_URL, {
    params: {
      ...params,
      language,
    },
  });
  let { data } = response;
  data.results = data.results.filter((element) => {
    return element.vote_average > 0 && element.poster_path;
  });
  data.results = data.results.map((element) => {
    element.image = `${IMAGE_URL}${element.poster_path}`;
    element.rating = element.vote_average;
    return element;
  });
  return data;
}

async function getMovieById(id, language = 'en') {
  const response = await axios.get(`${URL_MOVIE}/${id}`, {
    params: {
      language,
    },
  });
  let { data } = response;
  return data;
}
export default { getMovies, searchMovies, getMovieById, IMAGE_URL: IMAGE_URL };
