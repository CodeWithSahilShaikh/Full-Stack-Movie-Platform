const express = require('express');
const cors = require('cors');
const path = require("path");


// Create Express app
const app = express();

// ===========================
// MIDDLEWARE
// ===========================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


// Request logging (optional - for development)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// ===========================
// ROUTES
// ===========================
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/movies', require('./routes/movieRoutes'));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'CineCloud API is running',
    timestamp: new Date().toISOString()
  });
});

// ===========================
// 404 HANDLER
// ===========================
app.use((req, res, next) => {
  res.status(404).json({ 
    message: `Route ${req.originalUrl} not found` 
  });
});

// ===========================
// GLOBAL ERROR HANDLER
// ===========================
app.use((err, req, res, next) => {
  console.error('GLOBAL ERROR:', {
    name: err.name,
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });

  res.status(err.statusCode || 500).json({ 
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

module.exports = app;