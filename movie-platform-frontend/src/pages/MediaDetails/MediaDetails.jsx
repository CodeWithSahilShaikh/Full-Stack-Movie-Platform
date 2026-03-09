import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getImageUrl } from '../../services/tmdb';
import { addFavorite, removeFavorite, addToWatchLater, removeWatchLater, addToHistory, fetchFavorites, fetchWatchLater } from '../../redux/slices/userSlice';
import TrailerModal from '../../components/common/TrailerModal/TrailerModal';
import MovieRow from '../../components/common/MovieRow/MovieRow';
import { formatDate, formatRuntime } from '../../utils/helpers';
import { useMediaDetails } from '../../hooks/useMediaDetails';
import './MovieDetails.css';

const MediaDetails = ({ mediaType = 'movie' }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { favorites, watchLater } = useSelector((state) => state.user);
  
  const [showTrailer, setShowTrailer] = useState(false);

  const { data: movie, similar, trailer, loading } = useMediaDetails(id, mediaType);

  const isFavorite = favorites.some(fav => fav.movieId === parseInt(id));
  const isWatchLater = watchLater.some(item => item.movieId === parseInt(id));

  useEffect(() => {
    if (movie && isAuthenticated) {
      dispatch(addToHistory({
        movieId: movie.id,
        title: movie.name || movie.title,
        posterPath: movie.poster_path
      }));
      dispatch(fetchFavorites());
      dispatch(fetchWatchLater());
    }
  }, [movie, dispatch, isAuthenticated]);

  const handleFavorite = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (isFavorite) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite({
        movieId: movie.id,
        title: movie.name || movie.title,
        posterPath: movie.poster_path
      }));
    }
  };

  const handleWatchLater = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (isWatchLater) {
      dispatch(removeWatchLater(movie.id));
    } else {
      dispatch(addToWatchLater({
        movieId: movie.id,
        title: movie.name || movie.title,
        posterPath: movie.poster_path
      }));
    }
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="container" style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Media not found</h2>
      </div>
    );
  }

  const title = movie.name || movie.title;
  const releaseDate = movie.first_air_date || movie.release_date;
  const runtime = movie.episode_run_time?.[0] || movie.runtime;
  
  const backdropUrl = getImageUrl(movie.backdrop_path, 'original');
  const posterUrl = getImageUrl(movie.poster_path, 'w500');

  return (
    <div className="movie-details">
      <div 
        className="movie-backdrop"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        <div className="backdrop-overlay"></div>
      </div>

      <div className="container">
        <div className="movie-info-container">
          <img src={posterUrl} alt={title} className="movie-poster" />
          
          <div className="movie-info">
            <h1>{title}</h1>
            
            <div className="movie-meta">
              <span className="rating">⭐ {movie.vote_average?.toFixed(1)}/10</span>
              {releaseDate && <span>{formatDate(releaseDate)}</span>}
              {runtime && <span>{formatRuntime(runtime)}</span>}
            </div>

            <div className="genres">
              {movie.genres?.map(genre => (
                <span key={genre.id} className="genre-tag">
                  {genre.name}
                </span>
              ))}
            </div>

            {movie.tagline && <p className="tagline">{movie.tagline}</p>}
            <p className="overview">
              {movie.overview || 'Description not available'}
            </p>

            <div className="action-buttons">
              {trailer ? (
                <button 
                  className="btn-trailer"
                  onClick={() => setShowTrailer(true)}
                >
                  ▶ Watch Trailer
                </button>
              ) : (
                <button className="btn-trailer disabled" disabled>
                  Trailer not available
                </button>
              )}
              
              <button 
                className={`btn-favorite ${isFavorite ? 'active' : ''}`}
                onClick={handleFavorite}
              >
                {isFavorite ? '❤️ In Favorites' : '🤍 Add to Favorites'}
              </button>

              <button 
                className={`btn-favorite ${isWatchLater ? 'active' : ''}`}
                onClick={handleWatchLater}
              >
                {isWatchLater ? '🕒 In Watch Later' : '🕓 Save for Later'}
              </button>
            </div>

            {movie.credits?.cast && movie.credits.cast.length > 0 && (
              <div className="cast-section">
                <h3>Top Cast</h3>
                <div className="cast-list">
                  {movie.credits.cast.slice(0, 6).map(actor => (
                    <div key={actor.id} className="cast-member">
                      <img 
                        src={getImageUrl(actor.profile_path, 'w185')} 
                        alt={actor.name}
                        onError={(e) => e.target.src = '/placeholder.jpg'}
                      />
                      <p className="actor-name">{actor.name}</p>
                      <p className="character-name">{actor.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {similar.length > 0 && (
          <div style={{ marginTop: '60px' }}>
            <MovieRow title={`Similar ${mediaType === 'movie' ? 'Movies' : 'TV Shows'}`} movies={similar} />
          </div>
        )}
      </div>

      {showTrailer && (
        <TrailerModal 
          videoKey={trailer?.key} 
          onClose={() => setShowTrailer(false)} 
        />
      )}
    </div>
  );
};

export default MediaDetails;
