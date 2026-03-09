const movieService = require('../services/movie.service');
const asyncHandler = require('../utils/asyncHandler');

exports.getRecentMovies = asyncHandler(async (req, res) => {
  const movies = await movieService.getRecentMovies();
  res.json(movies);
});
