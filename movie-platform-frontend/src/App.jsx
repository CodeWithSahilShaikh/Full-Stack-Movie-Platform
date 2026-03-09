import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './redux/slices/authSlice';
import { fetchFavorites, fetchHistory, fetchWatchLater } from './redux/slices/userSlice';

// Pages - Lazy loaded
const Home = lazy(() => import('./pages/Home/Home'));
const Login = lazy(() => import('./pages/Auth/Login'));
const Register = lazy(() => import('./pages/Auth/Register'));
const MediaDetails = lazy(() => import('./pages/MediaDetails/MediaDetails'));
const PersonDetails = lazy(() => import('./pages/PersonDetails/PersonDetails'));
const Search = lazy(() => import('./pages/Search/Search'));
const Favorites = lazy(() => import('./pages/User/Favorites'));
const WatchLater = lazy(() => import('./pages/User/WatchLater'));
const History = lazy(() => import('./pages/User/History'));
const AdminDashboard = lazy(() => import('./components/features/admin/AdminDashboard'));
const ExploreMedia = lazy(() => import('./pages/Explore/ExploreMedia'));
const People = lazy(() => import('./pages/People/People'));

// Components - Normal import (NOT lazy)
import Navbar from './components/layout/Navbar/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/features/admin/AdminRoute';

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(loadUser()).then(() => {
        dispatch(fetchFavorites());
        dispatch(fetchHistory());
        dispatch(fetchWatchLater());
      });
    }
  }, [dispatch, token]);

  return (
    <div className="app">
      <Navbar />
      <Suspense 
        fallback={
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movie/:id" element={<MediaDetails mediaType="movie" />} />
          <Route path="/tv/:id" element={<MediaDetails mediaType="tv" />} />
          <Route path="/person/:id" element={<PersonDetails />} />
          <Route path="/search" element={<Search />} />
          <Route path="/explore" element={<ExploreMedia mediaType="movie" />} />
          <Route path="/explore/tv" element={<ExploreMedia mediaType="tv" />} />
          <Route path="/people" element={<People />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/watch-later" element={<WatchLater />} />
            <Route path="/history" element={<History />} />
          </Route>
          
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;