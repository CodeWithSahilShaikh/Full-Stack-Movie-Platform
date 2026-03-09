import axios from 'axios';

import { API_BASE_URL } from '../config/env';
import { STORAGE_KEYS } from '../config/constants';

const API_URL = API_BASE_URL;

const api = axios.create({
  baseURL: API_URL
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me')
};

export const userAPI = {
  getFavorites: () => api.get('/users/favorites'),
  addFavorite: (movie) => api.post('/users/favorites', movie),
  removeFavorite: (movieId) => api.delete(`/users/favorites/${movieId}`),
  
  getHistory: () => api.get('/users/history'),
  addToHistory: (movie) => api.post('/users/history', movie),
  clearHistory: () => api.delete('/users/history'),
  
  getWatchLater: () => api.get('/users/watch-later'),
  addToWatchLater: (movie) => api.post('/users/watch-later', movie),
  removeWatchLater: (movieId) => api.delete(`/users/watch-later/${movieId}`)
};

export const adminAPI = {
  // Movies
  getCustomMovies: () => api.get('/admin/movies'),
  addMovie: (movieData) => api.post('/admin/movies', movieData),
  updateMovie: (id, movieData) => api.put(`/admin/movies/${id}`, movieData),
  deleteMovie: (id) => api.delete(`/admin/movies/${id}`),
  
  // Users
  getAllUsers: () => api.get('/admin/users'),
  toggleBanUser: (id) => api.put(`/admin/users/${id}/ban`),
  deleteUser: (id) => api.delete(`/admin/users/${id}`)
};

export const movieAPI = {
  getRecentMovies: () => api.get('/movies/recent')
};

export default api;