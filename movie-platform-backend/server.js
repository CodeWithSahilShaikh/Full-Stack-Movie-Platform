const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const app = require('./src/app');


// ===========================
// LOAD ENVIRONMENT VARIABLES
// ===========================
dotenv.config();

// ===========================
// CONNECT TO DATABASE
// ===========================
connectDB();

// ===========================
// START SERVER
// ===========================
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║  🎬 CineCloud API Server               ║
║  ✅ Server running on port ${PORT}      ║
║  🗄️  Database connected                ║
║  🌍 Environment: ${process.env.NODE_ENV || 'development'}        ║
╚════════════════════════════════════════╝
  `);
});
