const express = require('express');
const router = express.Router();
const {
  addFavorite,
  removeFavorite,
  getFavorites,
  addToHistory,
  getHistory,
  clearHistory,
  addToWatchLater,
  removeFromWatchLater,
  getWatchLater
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.use(protect); // All routes require authentication

router.route('/favorites')
  .get(getFavorites)
  .post(addFavorite);

router.delete('/favorites/:movieId', removeFavorite);

router.route('/history')
  .get(getHistory)
  .post(addToHistory)
  .delete(clearHistory);

router.route('/watch-later')
  .get(getWatchLater)
  .post(addToWatchLater);

router.delete('/watch-later/:movieId', removeFromWatchLater);

module.exports = router;