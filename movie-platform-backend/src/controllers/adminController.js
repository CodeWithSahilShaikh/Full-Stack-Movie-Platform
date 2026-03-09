const adminService = require('../services/admin.service');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Add new movie
// @route   POST /api/admin/movies
exports.addMovie = asyncHandler(async (req, res) => {
  const movie = await adminService.addMovie(req.body, req.user._id);
  res.status(201).json(movie);
});

// @desc    Update movie
// @route   PUT /api/admin/movies/:id
exports.updateMovie = asyncHandler(async (req, res) => {
  const movie = await adminService.updateMovie(req.params.id, req.body);
  res.json(movie);
});

// @desc    Delete movie
// @route   DELETE /api/admin/movies/:id
exports.deleteMovie = asyncHandler(async (req, res) => {
  await adminService.deleteMovie(req.params.id);
  res.json({ message: 'Movie deleted' });
});

// @desc    Get all custom movies
// @route   GET /api/admin/movies
exports.getCustomMovies = asyncHandler(async (req, res) => {
  const movies = await adminService.getCustomMovies();
  res.json(movies);
});

// @desc    Get all users
// @route   GET /api/admin/users
exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await adminService.getAllUsers();
  res.json(users);
});

// @desc    Ban/Unban user
// @route   PUT /api/admin/users/:id/ban
exports.toggleBanUser = asyncHandler(async (req, res) => {
  const user = await adminService.toggleBanUser(req.params.id);
  res.json({ message: `User ${user.isBanned ? 'banned' : 'unbanned'}`, user });
});

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
exports.deleteUser = asyncHandler(async (req, res) => {
  await adminService.deleteUser(req.params.id);
  res.json({ message: 'User deleted' });
});