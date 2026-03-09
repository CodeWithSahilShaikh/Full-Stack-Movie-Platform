const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  movieId: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  posterPath: String,
  description: String,
  releaseDate: String,
  trailerUrl: String, // YouTube link
  genre: [String],
  category: {
    type: String,
    enum: ['movie', 'tv'],
    default: 'movie'
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);