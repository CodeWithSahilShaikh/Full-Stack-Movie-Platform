import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavorites } from '../../redux/slices/userSlice';
import MovieCard from '../../components/common/MovieCard/MovieCard';
import { Link } from 'react-router-dom';
import './Collection.css';

const Favorites = () => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  return (
    <div className="collection-page">
      <div className="container">
        <div className="collection-header">
          <h1>❤️ My Favorites</h1>
          <p>Your personally curated collection</p>
        </div>

        {favorites.length > 0 ? (
          <div className="collection-grid">
            {favorites.map((movie) => (
              <MovieCard key={movie.movieId} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h2>No favorites yet</h2>
            <p>Start adding movies to your favorites!</p>
            <Link to="/" style={{
              display: 'inline-block',
              marginTop: '20px',
              padding: '10px 24px',
              backgroundColor: '#e50914',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              transition: 'background-color 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f40612'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#e50914'}>
              Explore Movies
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;