import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWatchLater, removeWatchLater } from '../../redux/slices/userSlice';
import MovieCard from '../../components/common/MovieCard/MovieCard';
import './Collection.css';

const WatchLater = () => {
  const dispatch = useDispatch();
  const { watchLater, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchWatchLater());
  }, [dispatch]);

  const handleRemove = (movieId) => {
    dispatch(removeWatchLater(movieId));
  };

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="collection-page">
      <div className="container">
        <div className="collection-header">
          <h1 className="page-title">Watch Later</h1>
        </div>
        
        {watchLater.length === 0 ? (
          <div className="empty-state">
            <h2>Your watch later list is empty</h2>
            <p>Save shows and movies to watch later!</p>
            <Link to="/" className="btn-explore">
              Explore Movies
            </Link>
          </div>
        ) : (
          <div className="collection-grid">
            {watchLater.map((movie) => (
              <div key={movie.movieId || movie.id} className="favorite-card-wrapper" style={{ position: 'relative' }}>
                <MovieCard 
                  movie={{
                    id: movie.movieId,
                    title: movie.title,
                    poster_path: movie.posterPath
                  }} 
                />
                <button 
                  className="btn-remove-favorite"
                  style={{ 
                    position: 'absolute', 
                    top: '10px', 
                    right: '10px', 
                    background: 'rgba(0,0,0,0.7)', 
                    color: 'white', 
                    border: 'none', 
                    padding: '5px 10px', 
                    borderRadius: '4px',
                    cursor: 'pointer',
                    zIndex: 10
                  }}
                  onClick={() => handleRemove(movie.movieId)}
                >
                  ✕ Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchLater;
