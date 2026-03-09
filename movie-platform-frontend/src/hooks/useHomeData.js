import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrending, fetchPopular } from '../redux/slices/moviesSlice';
import { tmdbService } from '../services/tmdb';
import { movieAPI } from '../services/api';

export const useHomeData = () => {
  const dispatch = useDispatch();
  const { trending, popular, isLoading } = useSelector((state) => state.movies);
  
  const [nowPlaying, setNowPlaying] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [popularTv, setPopularTv] = useState([]);
  const [popularPeople, setPopularPeople] = useState([]);
  const [recentlyAdded, setRecentlyAdded] = useState([]);

  useEffect(() => {
    dispatch(fetchTrending());
    dispatch(fetchPopular({ page: 1 }));

    movieAPI.getRecentMovies()
      .then(({ data }) => setRecentlyAdded(data))
      .catch((err) => console.error("Failed to fetch recently added movies:", err));

    tmdbService.getMovies('now_playing')
      .then(({ data }) => setNowPlaying(data.results))
      .catch((err) => console.error("Failed to fetch now playing:", err));

    tmdbService.getMovies('top_rated')
      .then(({ data }) => setTopRated(data.results))
      .catch((err) => console.error("Failed to fetch top rated:", err));

    tmdbService.getTVShows('popular')
      .then(({ data }) => setPopularTv(data.results))
      .catch((err) => console.error("Failed to fetch popular TV:", err));

    tmdbService.getPeople('popular')
      .then(({ data }) => setPopularPeople(data.results))
      .catch((err) => console.error("Failed to fetch popular people:", err));
  }, [dispatch]);

  return {
    trending,
    popular,
    isLoading,
    nowPlaying,
    topRated,
    popularTv,
    popularPeople,
    recentlyAdded
  };
};
