const express = require('express');
const router = express.Router();
const {
  addMovie,
  updateMovie,
  deleteMovie,
  getCustomMovies,
  getAllUsers,
  toggleBanUser,
  deleteUser
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/auth');

router.use(protect, admin); // All routes require admin

router.route('/movies')
  .get(getCustomMovies)
  .post(addMovie);

router.route('/movies/:id')
  .put(updateMovie)
  .delete(deleteMovie);

router.get('/users', getAllUsers);
router.put('/users/:id/ban', toggleBanUser);
router.delete('/users/:id', deleteUser);

module.exports = router;