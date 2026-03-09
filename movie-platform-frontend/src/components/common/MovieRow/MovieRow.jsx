import { useRef } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './MovieRow.css';

const MovieRow = ({ title, movies }) => {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    const { current } = rowRef;
    if (current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div className="movie-row">
      <h2 className="row-title">{title}</h2>
      <div className="row-container">
        <button className="scroll-btn left" onClick={() => scroll('left')}>
          ‹
        </button>
        <div className="row-movies" ref={rowRef}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <button className="scroll-btn right" onClick={() => scroll('right')}>
          ›
        </button>
      </div>
    </div>
  );
};

export default MovieRow;