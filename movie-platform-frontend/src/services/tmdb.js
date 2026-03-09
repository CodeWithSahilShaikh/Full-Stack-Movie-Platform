import axios from 'axios';

import { TMDB_API_KEY, TMDB_BASE_URL, TMDB_IMAGE_BASE_URL } from '../config/env';

const API_KEY = TMDB_API_KEY; 
const BASE_URL = TMDB_BASE_URL;
const IMAGE_BASE_URL = TMDB_IMAGE_BASE_URL;

const tmdbAPI = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY
  }
});

export const getImageUrl = (path, size = 'w500') => {
  if (!path) return '/placeholder.jpg'; // We'll create this
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const tmdbService = {
  // Trending
  getTrending: (mediaType = 'all', timeWindow = 'day') =>
    tmdbAPI.get(`/trending/${mediaType}/${timeWindow}`),

  // Popular
  getPopularMovies: (page = 1) =>
    tmdbAPI.get('/movie/popular', { params: { page } }),

  getPopularTVShows: (page = 1) =>
    tmdbAPI.get('/tv/popular', { params: { page } }),

  // Movies
  getMovies: (category = 'now_playing', page = 1) =>
    tmdbAPI.get(`/movie/${category}`, { params: { page } }),

  // TV Shows
  getTVShows: (category = 'popular', page = 1) =>
    tmdbAPI.get(`/tv/${category}`, { params: { page } }),

  // Details
  getMovieDetails: (id) =>
    tmdbAPI.get(`/movie/${id}`, {
      params: { append_to_response: 'videos,credits,similar' }
    }),

  getTVDetails: (id) =>
    tmdbAPI.get(`/tv/${id}`, {
      params: { append_to_response: 'videos,credits,similar' }
    }),

  // Search
  searchMulti: (query, page = 1) =>
    tmdbAPI.get('/search/multi', { params: { query, page } }),

  searchMovies: (query, page = 1) =>
    tmdbAPI.get('/search/movie', { params: { query, page } }),

  searchTVShows: (query, page = 1) =>
    tmdbAPI.get('/search/tv', { params: { query, page } }),

  searchPeople: (query, page = 1) =>
    tmdbAPI.get('/search/person', { params: { query, page } }),

  // People
  getPeople: (category = 'popular', page = 1) =>
    tmdbAPI.get(`/person/${category}`, { params: { page } }),

  getPersonDetails: (id) =>
    tmdbAPI.get(`/person/${id}`, {
      params: { append_to_response: 'movie_credits,tv_credits' }
    }),

  // Genres
  getMovieGenres: () =>
    tmdbAPI.get('/genre/movie/list'),

  getTVGenres: () =>
    tmdbAPI.get('/genre/tv/list'),

  // Discover
  discoverMovies: (with_genres = '', page = 1) =>
    tmdbAPI.get('/discover/movie', {
      params: { 
        page,
        with_genres,
        sort_by: 'popularity.desc',
        include_adult: false
      }
    }),

  discoverTVShows: (with_genres = '', page = 1) =>
    tmdbAPI.get('/discover/tv', {
      params: { 
        page,
        with_genres,
        sort_by: 'popularity.desc',
        include_adult: false
      }
    }),
};