import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHistory, clearHistoryThunk } from '../../redux/slices/userSlice';
import MovieCard from '../../components/common/MovieCard/MovieCard';
import { Link } from 'react-router-dom';
import './Collection.css';

const History = () => {
  const dispatch = useDispatch();
  const { watchHistory } = useSelector((state) => state.user);

  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    dispatch(fetchHistory());
  }, [dispatch]);

  const handleClearHistory = () => {
    setShowConfirm(true);
  };

  const confirmClearHistory = () => {
    dispatch(clearHistoryThunk());
    setShowConfirm(false);
  };

  return (
    <div className="collection-page">
      <div className="container">
        <div className="collection-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>🕒 Watch History</h1>
            <p>Recently viewed movies and shows</p>
          </div>
          {watchHistory.length > 0 && (
            <button 
              onClick={handleClearHistory}
              style={{
                background: 'rgba(255, 0, 0, 0.2)',
                color: '#ff4444',
                border: '1px solid #ff4444',
                padding: '10px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#ff4444';
                e.target.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 0, 0, 0.2)';
                e.target.style.color = '#ff4444';
              }}
            >
              Clear History
            </button>
          )}
        </div>

        {watchHistory.length > 0 ? (
          <div className="collection-grid">
            {watchHistory.map((movie) => (
              <MovieCard key={`${movie.movieId}-${movie.watchedAt}`} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h2>No history yet</h2>
            <p>Your watched movies will appear here</p>
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

      {showConfirm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          backdropFilter: 'blur(4px)'
        }}>
          <div style={{
            background: '#1a1a1a',
            padding: '40px',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
            textAlign: 'center',
            maxWidth: '400px',
            width: '90%'
          }}>
            <h2 style={{ margin: '0 0 16px 0', fontSize: '1.5rem', color: '#fff' }}>Clear Watch History?</h2>
            <p style={{ margin: '0 0 32px 0', color: '#999', lineHeight: '1.5' }}>
              Are you sure you want to clear your entire watch history? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <button 
                onClick={() => setShowConfirm(false)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: '1px solid #444',
                  background: 'transparent',
                  color: '#fff',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.background = '#333'}
                onMouseLeave={(e) => e.target.style.background = 'transparent'}
              >
                Cancel
              </button>
              <button 
                onClick={confirmClearHistory}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#e50914',
                  color: '#fff',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.background = '#f40612'}
                onMouseLeave={(e) => e.target.style.background = '#e50914'}
              >
                Yes, Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;