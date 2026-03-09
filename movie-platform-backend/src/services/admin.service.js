const Movie = require('../models/Movie');
const User = require('../models/User');
const ApiError = require('../utils/ApiError');

class AdminService {
  async addMovie(movieData, addedByUserId) {
    return await Movie.create({
      ...movieData,
      addedBy: addedByUserId
    });
  }

  async updateMovie(id, movieData) {
    const movie = await Movie.findByIdAndUpdate(
      id,
      movieData,
      { new: true, runValidators: true }
    );
    if (!movie) {
      throw new ApiError(404, 'Movie not found');
    }
    return movie;
  }

  async deleteMovie(id) {
    const movie = await Movie.findByIdAndDelete(id);
    if (!movie) {
      throw new ApiError(404, 'Movie not found');
    }
    return true;
  }

  async getCustomMovies() {
    return await Movie.find().populate('addedBy', 'username');
  }

  async getAllUsers() {
    return await User.find().select('-password');
  }

  async toggleBanUser(id) {
    const user = await User.findById(id);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    user.isBanned = !user.isBanned;
    await user.save();
    return user;
  }

  async deleteUser(id) {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    return true;
  }
}

module.exports = new AdminService();
