const Movie = require('../models/Movie');

class MovieService {
  async getRecentMovies() {
    return await Movie.find().sort({ createdAt: -1 }).limit(10);
  }
}

module.exports = new MovieService();
