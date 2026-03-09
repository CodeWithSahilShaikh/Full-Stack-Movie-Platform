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

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js (v18 or higher recommended)
*   MongoDB instance (local or MongoDB Atlas)
*   TMDB (The Movie Database) API Key

### Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/CodeWithSahilShaikh/Full-Stack-Movie-Platform.git
    cd Full-Stack-Movie-Platform
    ```

2.  **Setup the Backend**
    ```bash
    cd movie-platform-backend
    npm install
    ```
    Create a `.env` file in the `movie-platform-backend` directory and add the following variables:
    ```env
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    NODE_ENV=development
    ```

3.  **Setup the Frontend**
    ```bash
    cd ../movie-platform-frontend
    npm install
    ```
    Create a `.env` file in the `movie-platform-frontend` directory and add your TMDB configuration:
    ```env
    VITE_TMDB_API_KEY=your_tmdb_api_key
    VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
    VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
    VITE_API_BASE_URL=http://localhost:5000/api
    ```

### Running the Application

You will need two terminal windows to run both the frontend and backend servers simultaneously.

**Terminal 1 (Backend):**
```bash
cd movie-platform-backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd movie-platform-frontend
npm run dev
```

The frontend application will be served at `http://localhost:5173` (or the port specified by Vite), and the backend API will run on `http://localhost:5000`.

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

## 📝 License

This project is licensed under the ISC License.
