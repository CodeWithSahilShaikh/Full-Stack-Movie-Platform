import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import PersonCard from '../../components/common/PersonCard/PersonCard';
import { tmdbService } from '../../services/tmdb';
import './People.css';

const People = () => {
  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchData(1);
  }, []);

  const fetchData = (pageNum) => {
    tmdbService.getPeople('popular', pageNum)
      .then(({ data }) => {
        if (pageNum === 1) {
          setPeople(data.results);
        } else {
          setPeople(prev => [...prev, ...data.results]);
        }
        
        if (pageNum >= data.total_pages || pageNum >= 500) { // TMDB limits to 500 pages
          setHasMore(false);
        }
      })
      .catch(err => console.error("Failed to fetch popular people:", err));
  };

  const fetchMoreData = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchData(nextPage);
  };

  return (
    <div className="people-page">
      <div className="container">
        
        <div className="people-header">
          <h2>🌟 Popular People</h2>
          <p>Discover the trending actors and actresses right now.</p>
        </div>

        <InfiniteScroll
          dataLength={people.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div className="loader"></div>
            </div>
          }
          endMessage={
            <p style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
              <b>You have seen all the stars!</b>
            </p>
          }
          style={{ overflow: 'hidden' }}
        >
          <div className="people-grid">
            {people.map((person, index) => (
              // Using index fallback for key due to rare TMDB duplicates across paginated calls
              <PersonCard key={`${person.id}-${index}`} person={person} />
            ))}
          </div>
        </InfiniteScroll>

      </div>
    </div>
  );
};

export default People;
