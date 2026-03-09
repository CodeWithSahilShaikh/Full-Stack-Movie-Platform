import { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import { extractYouTubeId } from '../../../utils/helpers';
import './TrailerModal.css';

const TrailerModal = ({ videoKey, onClose }) => {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleBackdropClick = (e) => {
    if (e.target.className === 'trailer-modal') {
      onClose();
    }
  };

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="trailer-modal" onClick={handleBackdropClick}>
      <div className="trailer-content">
        <button className="close-modal" onClick={onClose}>
          ✕
        </button>
        {videoKey ? (
          <>
            {!isReady && (
              <div className="trailer-loader-container">
                <div className="loader"></div>
              </div>
            )}
            <YouTube 
              videoId={videoKey} 
              opts={opts} 
              className={`youtube-player ${isReady ? 'ready' : 'hidden'}`} 
              onReady={() => setIsReady(true)}
            />
          </>
        ) : (
          <div className="no-trailer">
            <p>Trailer for this movie is currently unavailable.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrailerModal;