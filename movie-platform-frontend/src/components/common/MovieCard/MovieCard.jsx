import { Link } from 'react-router-dom';
import { getImageUrl } from '../../../services/tmdb';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const imageUrl = getImageUrl(movie.poster_path || movie.posterPath || movie.profile_path);
  const title = movie.title || movie.name;
  const date = movie.release_date || movie.first_air_date || movie.releaseDate;

  // Determine media type to prevent TMDB ID collisions
  const isPerson = movie.media_type === 'person' || movie.known_for_department || movie.profile_path;
  const isTVShow = movie.media_type === 'tv' || (!movie.title && movie.name && !isPerson);
  const routePath = isPerson 
    ? `/person/${movie.id || movie.personId}`
    : isTVShow 
      ? `/tv/${movie.id || movie.movieId}` 
      : `/movie/${movie.id || movie.movieId}`;

  return (
    <Link to={routePath} className="movie-card">
      <div className="movie-card-image">
        <img 
          src={imageUrl} 
          alt={title} 
          loading="lazy" 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/placeholder.jpg';
          }}
        />
        <div className="movie-card-overlay">
          <span className="play-icon">▶</span>
        </div>
      </div>
      <div className="movie-card-info">
        <h3>{title}</h3>
        {date && <p className="release-date">{new Date(date).getFullYear()}</p>}
        {movie.vote_average && (
          <div className="rating">
            <span className="rating-star">⭐</span>
            <span className="rating-value">{movie.vote_average.toFixed(1)}</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default MovieCard;