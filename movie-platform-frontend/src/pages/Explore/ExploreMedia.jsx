import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieCard from '../../components/common/MovieCard/MovieCard';
import { tmdbService } from '../../services/tmdb';
import './Explore.css';

const ExploreMedia = ({ mediaType = 'movie' }) => {
  const [data, setData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const isMovie = mediaType === 'movie';
  const getGenres = isMovie ? tmdbService.getMovieGenres : tmdbService.getTVGenres;
  const discoverData = isMovie ? tmdbService.discoverMovies : tmdbService.discoverTVShows;

  // Reset state when mediaType changes
  useEffect(() => {
    setData([]);
    setGenres([]);
    setSelectedGenre('');
    setPage(1);
    setHasMore(true);
    
    // Fetch genres for the new mediaType
    getGenres()
      .then(({ data }) => setGenres(data.genres || []))
      .catch(err => console.error(`Failed to fetch ${mediaType} genres:`, err));
  }, [mediaType, getGenres]);

  // Fetch data when genre or mediaType changes
  useEffect(() => {
    setData([]); 
    setPage(1);
    setHasMore(true);
    if (genres.length > 0 || selectedGenre === '') {
       fetchData(1, selectedGenre);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGenre, mediaType]);

  const fetchData = (pageNum, genreId) => {
    discoverData(genreId, pageNum)
      .then(({ data: responseData }) => {
        if (pageNum === 1) {
          setData(responseData.results);
        } else {
          setData(prev => [...prev, ...responseData.results]);
        }
        
        if (pageNum >= responseData.total_pages) {
          setHasMore(false);
        }
      })
      .catch(err => console.error(`Failed to fetch explore ${mediaType}:`, err));
  };

  const fetchMoreData = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchData(nextPage, selectedGenre);
  };

  return (
    <div className="explore-page">
      <div className="container">
        
        <div className="explore-header">
          <h2>{isMovie ? '🎬 Explore Movies' : '📺 Explore TV Shows'}</h2>
          
          <div className="genre-filters">
            <button 
              className={`genre-pill ${selectedGenre === '' ? 'active' : ''}`}
              onClick={() => setSelectedGenre('')}
            >
              All Genres
            </button>
            {genres.map(genre => (
              <button
                key={genre.id}
                className={`genre-pill ${selectedGenre === genre.id.toString() ? 'active' : ''}`}
                onClick={() => setSelectedGenre(genre.id.toString())}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>

        <InfiniteScroll
          dataLength={data.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div className="loader"></div>
            </div>
          }
          endMessage={
            <p style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
              <b>You have seen it all!</b>
            </p>
          }
          style={{ overflow: 'hidden' }}
        >
          <div className="movie-grid">
            {data.map(item => (
              <MovieCard key={item.id} movie={{ ...item, media_type: mediaType }} />
            ))}
          </div>
        </InfiniteScroll>

      </div>
    </div>
  );
};

export default ExploreMedia;
