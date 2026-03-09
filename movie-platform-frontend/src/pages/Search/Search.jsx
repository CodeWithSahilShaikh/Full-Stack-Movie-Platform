import InfiniteScroll from 'react-infinite-scroll-component';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import MovieCard from '../../components/common/MovieCard/MovieCard';
import { useSearchPagination } from '../../hooks/useSearchPagination';
import { SEARCH_FILTERS } from '../../config/constants';
import './Search.css';

const Search = () => {
  const {
    searchResults,
    hasMore,
    currentQuery,
    filterType,
    handleSearch,
    handleFilterChange,
    fetchMoreData
  } = useSearchPagination();

  const filters = SEARCH_FILTERS;

  return (
    <div className="search-page">
      <div className="container">
        <div className="search-header">
          <h1>Search Movies,TV Shows & People</h1>
          <p>Find your next favorite movie, series or person</p>
        </div>

        <SearchBar onSearch={handleSearch} />

        <div className="search-filters">
          {filters.map(filter => (
            <button
              key={filter}
              className={`search-filter-btn ${filterType === filter ? 'active' : ''}`}
              onClick={() => handleFilterChange(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {searchResults.length > 0 ? (
          <InfiniteScroll
            dataLength={searchResults.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={
              <div className="loader-container">
                <div className="loader"></div>
              </div>
            }
            endMessage={
              <p style={{ textAlign: 'center', color: '#aaa', margin: '20px' }}>
                No more results
              </p>
            }
          >
            <div className="search-results">
              {searchResults.map((movie) => (
                <MovieCard key={`${movie.id}-${movie.media_type}`} movie={movie} />
              ))}
            </div>
          </InfiniteScroll>
        ) : currentQuery ? (
          <div className="no-results">
            <p>No results found for "{currentQuery}"</p>
          </div>
        ) : (
          <div className="search-placeholder">
            <p>Start typing to search for movies, TV shows, or people...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;