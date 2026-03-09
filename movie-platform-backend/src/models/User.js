const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  favorites: [{
    movieId: Number,
    title: String,
    posterPath: String,
    addedAt: { type: Date, default: Date.now }
  }],
  watchLater: [{
    movieId: Number,
    title: String,
    posterPath: String,
    addedAt: { type: Date, default: Date.now }
  }],
  watchHistory: [{
    movieId: Number,
    title: String,
    posterPath: String,
    watchedAt: { type: Date, default: Date.now }
  }],
  isBanned: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);