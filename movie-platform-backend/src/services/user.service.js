const User = require('../models/User');
const ApiError = require('../utils/ApiError');

class UserService {
  async addFavorite(userId, movieData) {
    const { movieId, title, posterPath } = movieData;
    const user = await User.findById(userId);

    const exists = user.favorites.find(fav => fav.movieId === Number(movieId));
    if (exists) {
      throw new ApiError(400, 'Movie already in favorites');
    }

    user.favorites.push({ movieId, title, posterPath });
    await user.save();
    return user.favorites;
  }

  async removeFavorite(userId, movieId) {
    const user = await User.findById(userId);
    user.favorites = user.favorites.filter(
      fav => fav.movieId !== parseInt(movieId)
    );
    await user.save();
    return user.favorites;
  }

  async getFavorites(userId) {
    const user = await User.findById(userId);
    return user.favorites;
  }

  async addToHistory(userId, movieData) {
    const { movieId, title, posterPath } = movieData;
    const user = await User.findById(userId);

    user.watchHistory = user.watchHistory.filter(
      item => item.movieId !== Number(movieId)
    );
    user.watchHistory.unshift({ movieId, title, posterPath });

    if (user.watchHistory.length > 50) {
      user.watchHistory = user.watchHistory.slice(0, 50);
    }

    await user.save();
    return user.watchHistory;
  }

  async getHistory(userId) {
    const user = await User.findById(userId);
    return user.watchHistory;
  }

  async clearHistory(userId) {
    const user = await User.findById(userId);
    user.watchHistory = [];
    await user.save();
    return user.watchHistory;
  }

  async addToWatchLater(userId, movieData) {
    const { movieId, title, posterPath } = movieData;
    const user = await User.findById(userId);

    const exists = user.watchLater.find(item => item.movieId === Number(movieId));
    if (exists) {
      throw new ApiError(400, 'Movie already in Watch Later');
    }

    user.watchLater.push({ movieId, title, posterPath });
    await user.save();
    return user.watchLater;
  }

  async removeFromWatchLater(userId, movieId) {
    const user = await User.findById(userId);
    user.watchLater = user.watchLater.filter(
      item => item.movieId !== parseInt(movieId)
    );
    await user.save();
    return user.watchLater;
  }

  async getWatchLater(userId) {
    const user = await User.findById(userId);
    return user.watchLater;
  }
}

module.exports = new UserService();
