import './MovieCardSkeleton.css';

const MovieCardSkeleton = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-info">
        <div className="skeleton-title"></div>
        <div className="skeleton-date"></div>
      </div>
    </div>
  );
};

export default MovieCardSkeleton;