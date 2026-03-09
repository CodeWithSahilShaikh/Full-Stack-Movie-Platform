import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovies, clearSearch } from '../redux/slices/moviesSlice';

export const useSearchPagination = () => {
  const dispatch = useDispatch();
  const { searchResults } = useSelector((state) => state.movies);
  
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [currentQuery, setCurrentQuery] = useState('');
  const [filterType, setFilterType] = useState('All');

  const handleSearch = (query) => {
    setCurrentQuery(query);
    setPage(1);
    setHasMore(true);
    if (query.trim().length >= 2) {
      dispatch(searchMovies({ query, page: 1, type: filterType }));
    } else {
      dispatch(clearSearch());
    }
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
    if (currentQuery.trim().length >= 2) {
      setPage(1);
      setHasMore(true);
      dispatch(searchMovies({ query: currentQuery, page: 1, type }));
    }
  };

  const fetchMoreData = () => {
    if (currentQuery) {
      const nextPage = page + 1;
      // In a real implementation we would check the response to see if there are more pages.
      // For now we assume if there are results, we can keep scrolling until Redux returns fewer than 20 items.
      dispatch(searchMovies({ query: currentQuery, page: nextPage, type: filterType }))
        .then((action) => {
           if (action.payload && action.payload.length < 20) {
              setHasMore(false);
           }
        });
      setPage(nextPage);
    }
  };

  useEffect(() => {
    // Reset on component unmount
    return () => {
      setPage(1);
      setCurrentQuery('');
      dispatch(clearSearch());
    };
  }, [dispatch]);

  return {
    searchResults,
    page,
    hasMore,
    currentQuery,
    filterType,
    handleSearch,
    handleFilterChange,
    fetchMoreData
  };
};
