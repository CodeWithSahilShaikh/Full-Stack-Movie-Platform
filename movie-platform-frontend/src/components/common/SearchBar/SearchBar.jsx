import { useState, useCallback } from 'react';
import { debounce } from '../../../utils/debounce';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((searchQuery) => {
      onSearch(searchQuery);
    }, 500),
    [onSearch]
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search movies, TV shows, people..."
          value={query}
          onChange={handleChange}
          className="search-input"
        />
        {query && (
          <button onClick={handleClear} className="clear-btn">
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;