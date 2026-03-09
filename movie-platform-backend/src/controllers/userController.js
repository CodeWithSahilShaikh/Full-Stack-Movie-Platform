const userService = require('../services/user.service');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Add movie to favorites
// @route   POST /api/users/favorites
exports.addFavorite = asyncHandler(async (req, res) => {
  const favorites = await userService.addFavorite(req.user._id, req.body);
  res.json({ message: 'Added to favorites', favorites });
});

// @desc    Remove from favorites
// @route   DELETE /api/users/favorites/:movieId
exports.removeFavorite = asyncHandler(async (req, res) => {
  const favorites = await userService.removeFavorite(req.user._id, req.params.movieId);
  res.json({ message: 'Removed from favorites', favorites });
});

// @desc    Get user favorites
// @route   GET /api/users/favorites
exports.getFavorites = asyncHandler(async (req, res) => {
  const favorites = await userService.getFavorites(req.user._id);
  res.json(favorites);
});

// @desc    Add to watch history
// @route   POST /api/users/history
exports.addToHistory = asyncHandler(async (req, res) => {
  await userService.addToHistory(req.user._id, req.body);
  res.json({ message: 'Added to history' });
});

// @desc    Get watch history
// @route   GET /api/users/history
exports.getHistory = asyncHandler(async (req, res) => {
  const history = await userService.getHistory(req.user._id);
  res.json(history);
});

// @desc    Clear watch history
// @route   DELETE /api/users/history
exports.clearHistory = asyncHandler(async (req, res) => {
  const history = await userService.clearHistory(req.user._id);
  res.json({ message: 'History cleared', watchHistory: history });
});

// @desc    Add movie to watch later
// @route   POST /api/users/watch-later
exports.addToWatchLater = asyncHandler(async (req, res) => {
  const watchLater = await userService.addToWatchLater(req.user._id, req.body);
  res.json({ message: 'Added to Watch Later', watchLater });
});

// @desc    Remove from watch later
// @route   DELETE /api/users/watch-later/:movieId
exports.removeFromWatchLater = asyncHandler(async (req, res) => {
  const watchLater = await userService.removeFromWatchLater(req.user._id, req.params.movieId);
  res.json({ message: 'Removed from Watch Later', watchLater });
});

// @desc    Get user watch later list
// @route   GET /api/users/watch-later
exports.getWatchLater = asyncHandler(async (req, res) => {
  const watchLater = await userService.getWatchLater(req.user._id);
  res.json(watchLater);
});