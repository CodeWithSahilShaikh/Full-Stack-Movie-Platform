const authService = require('../services/auth.service');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Register new user
// @route   POST /api/auth/register
exports.register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);
  res.status(201).json(result);
});

// @desc    Login user
// @route   POST /api/auth/login
exports.login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);
  res.json(result);
});

// @desc    Get current user
// @route   GET /api/auth/me
exports.getMe = asyncHandler(async (req, res) => {
  const user = await authService.getUserById(req.user._id);
  res.json(user);
});