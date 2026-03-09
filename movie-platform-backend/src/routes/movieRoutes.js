const express = require('express');
const router = express.Router();
const { getRecentMovies } = require('../controllers/movieController');

router.get('/recent', getRecentMovies);

module.exports = router;
