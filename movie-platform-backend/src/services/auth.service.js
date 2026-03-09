const User = require('../models/User');
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

class AuthService {
  async register(userData) {
    const { username, email, password } = userData;

    if (!username || !email || !password) {
      throw new ApiError(400, 'Please provide all fields');
    }  

    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      throw new ApiError(400, 'User already exists');
    }

    const user = await User.create({ username, email, password });

    return {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    };
  }

  async login(credentials) {
    const { email, password } = credentials;

    if (!email || !password) {
      throw new ApiError(400, 'Please provide email and password');
    }

    const user = await User.findOne({ email });
    
    if (!user) {
      throw new ApiError(401, 'Invalid credentials');
    }

    if (user.isBanned) {
      throw new ApiError(403, 'Your account has been banned');
    }

    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      throw new ApiError(401, 'Invalid credentials');
    }

    return {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    };
  }

  async getUserById(userId) {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    return user;
  }
}

module.exports = new AuthService();
