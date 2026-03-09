import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { tmdbService } from '../../services/tmdb';

const initialState = {
  trending: [],
  popular: [],
  movies: [],
  tvShows: [],
  searchResults: [],
  currentMovie: null,
  isLoading: false,
  error: null,
  hasMore: true,
  page: 1
};

export const fetchTrending = createAsyncThunk(
  'movies/fetchTrending',
  async () => {
    const { data } = await tmdbService.getTrending();
    return data.results;
  }
);

export const fetchPopular = createAsyncThunk(
  'movies/fetchPopular',
  async ({ page = 1 }) => {
    const { data } = await tmdbService.getPopularMovies(page);
    return { results: data.results, page };
  }
);

export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchDetails',
  async (id) => {
    const { data } = await tmdbService.getMovieDetails(id);
    return data;
  }
);

export const searchMovies = createAsyncThunk(
  'movies/search',
  async ({ query, page = 1, type = 'All' }) => {
    let response;
    switch (type) {
      case 'Movies':
        response = await tmdbService.searchMovies(query, page);
        break;
      case 'TV Shows':
        response = await tmdbService.searchTVShows(query, page);
        break;
      case 'People':
        response = await tmdbService.searchPeople(query, page);
        break;
      case 'All':
      default:
        response = await tmdbService.searchMulti(query, page);
        break;
    }
    return { results: response.data.results, page };
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.searchResults = [];
      state.page = 1;
    },
    clearCurrentMovie: (state) => {
      state.currentMovie = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrending.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTrending.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trending = action.payload;
      })
      .addCase(fetchTrending.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPopular.fulfilled, (state, action) => {
        if (action.payload.page === 1) {
          state.popular = action.payload.results;
        } else {
          state.popular = [...state.popular, ...action.payload.results];
        }
        state.page = action.payload.page;
        state.hasMore = action.payload.results.length > 0;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.currentMovie = action.payload;
        state.isLoading = false;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        if (action.payload.page === 1) {
          state.searchResults = action.payload.results;
        } else {
          state.searchResults = [...state.searchResults, ...action.payload.results];
        }
      });
  }
});

export const { clearSearch, clearCurrentMovie } = moviesSlice.actions;
export default moviesSlice.reducer;