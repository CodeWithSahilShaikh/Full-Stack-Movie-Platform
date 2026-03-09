import { useState, useEffect } from 'react';
import { tmdbService } from '../services/tmdb';

export const useMediaDetails = (id, mediaType) => {
  const [data, setData] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchMethod = mediaType === 'movie' 
          ? tmdbService.getMovieDetails 
          : tmdbService.getTVDetails;
          
        const response = await fetchMethod(id);
        const item = response.data;
        
        setData(item);
        setSimilar(item.similar?.results || []);
        
        // Find trailer
        const videos = item.videos?.results || [];
        const trailerVideo = videos.find(
          video => video.type === 'Trailer' && video.site === 'YouTube'
        );
        setTrailer(trailerVideo);
      } catch (err) {
        console.error(`Error fetching ${mediaType} details:`, err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, mediaType]);

  return { data, similar, trailer, loading, error };
};
