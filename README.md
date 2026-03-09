# 🎬 CineCloud - Full-Stack Movie Platform

Welcome to **CineCloud**, a comprehensive full-stack movie and TV show exploration platform. CineCloud allows users to discover trending movies, search for their favorite TV shows, and manage content efficiently.

## ✨ Features

*   **Extensive Catalog**: Browse and search through a vast collection of Movies, TV Shows, and People.
*   **Dynamic Search & Filtering**: Fast, responsive search functionality with categorized filter pills (All, Movie, TV Show, People).
*   **Theming**: Fully responsive UI with seamless Light and Dark mode support.
*   **Admin Dashboard**: Dedicated dashboard for administrators to manage users and view platform analytics.
*   **Infinite Scrolling**: Smooth, endless scrolling for an optimal browsing experience.
*   **Trailer Integration**: Watch movie and TV show trailers directly within the platform using YouTube integration.
*   **Secure Authentication**: Robust user authentication with JWT and secure password hashing.

## 🛠️ Technology Stack

### Frontend
*   **Framework**: [React.js](https://react.dev/) (v19) setup with [Vite](https://vitejs.dev/)
*   **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) & React-Redux
*   **Routing**: [React Router DOM](https://reactrouter.com/)
*   **Styling**: Vanilla CSS with comprehensive CSS variables for theming
*   **API Client**: Axios
*   **Key Libraries**: `react-icons`, `react-infinite-scroll-component`, `react-youtube`

### Backend
*   **Runtime**: [Node.js](https://nodejs.org/)
*   **Framework**: [Express.js](https://expressjs.com/)
*   **Database**: [MongoDB](https://www.mongodb.com/) with Mongoose ODM
*   **Authentication**: JSON Web Tokens (JWT) & bcryptjs
*   **Middleware**: CORS, Cookie-Parser, express.json


## 📁 Project Structure

```text
Full-Stack-Movie-Platform/
├── movie-platform-backend/       # Express.js REST API
│   ├── src/                      # Source code for backend
│   │   ├── controllers/          # Route handlers
│   │   ├── models/               # Mongoose schemas
│   │   ├── routes/               # Express routes
│   │   └── config/               # DB & Env configurations
│   ├── app.js                    # Express app setup
│   └── server.js                 # Server entry point
│
└── movie-platform-frontend/      # React.js application
    ├── src/                      # Source code for frontend
    │   ├── components/           # Reusable UI components
    │   ├── pages/                # Page views (Home, Admin, etc.)
    │   ├── store/                # Redux store & slices
    │   └── config/               # Frontend environment config
    ├── index.html                # App entry HTML
    └── vite.config.js            # Vite configuration
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/CodeWithSahilShaikh/Full-Stack-Movie-Platform/issues).

