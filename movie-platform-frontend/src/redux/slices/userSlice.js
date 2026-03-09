import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userAPI } from '../../services/api';

const initialState = {
  favorites: [],
  watchHistory: [],
  watchLater: [],
  isLoading: false,
  error: null
};

export const fetchFavorites = createAsyncThunk(
  'user/fetchFavorites',
  async () => {
    const { data } = await userAPI.getFavorites();
    return data;
  }
);

export const addFavorite = createAsyncThunk(
  'user/addFavorite',
  async (movie) => {
    const { data } = await userAPI.addFavorite(movie);
    return data.favorites;
  }
);

export const removeFavorite = createAsyncThunk(
  'user/removeFavorite',
  async (movieId) => {
    const { data } = await userAPI.removeFavorite(movieId);
    return data.favorites;
  }
);

export const fetchHistory = createAsyncThunk(
  'user/fetchHistory',
  async () => {
    const { data } = await userAPI.getHistory();
    return data;
  }
);

export const addToHistory = createAsyncThunk(
  'user/addToHistory',
  async (movie) => {
    await userAPI.addToHistory(movie);
    return movie;
  }
);

export const clearHistoryThunk = createAsyncThunk(
  'user/clearHistoryThunk',
  async () => {
    const { data } = await userAPI.clearHistory();
    return data.watchHistory;
  }
);

export const fetchWatchLater = createAsyncThunk(
  'user/fetchWatchLater',
  async () => {
    const { data } = await userAPI.getWatchLater();
    return data;
  }
);

export const addToWatchLater = createAsyncThunk(
  'user/addToWatchLater',
  async (movie) => {
    const { data } = await userAPI.addToWatchLater(movie);
    return data.watchLater;
  }
);

export const removeWatchLater = createAsyncThunk(
  'user/removeWatchLater',
  async (movieId) => {
    const { data } = await userAPI.removeWatchLater(movieId);
    return data.watchLater;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.watchHistory = action.payload;
      })
      .addCase(clearHistoryThunk.fulfilled, (state, action) => {
        state.watchHistory = action.payload;
      })
      .addCase(fetchWatchLater.fulfilled, (state, action) => {
        state.watchLater = action.payload;
      })
      .addCase(addToWatchLater.fulfilled, (state, action) => {
        state.watchLater = action.payload;
      })
      .addCase(removeWatchLater.fulfilled, (state, action) => {
        state.watchLater = action.payload;
      });
  }
});

export default userSlice.reducer;