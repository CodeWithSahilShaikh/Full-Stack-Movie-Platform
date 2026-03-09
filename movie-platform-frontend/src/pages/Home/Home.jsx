import { useHomeData } from '../../hooks/useHomeData';
import MovieRow from '../../components/common/MovieRow/MovieRow';
import Footer from '../../components/layout/Footer/Footer';
import './Home.css';

const Home = () => {
  const {
    trending,
    popular,
    isLoading,
    nowPlaying,
    topRated,
    popularTv,
    popularPeople,
    recentlyAdded
  } = useHomeData();

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to <span className="logo-white">Cine</span><span className="logo-red">Cloud</span></h1>
          <p>Discover millions of movies and TV shows</p>
        </div>
      </div>

      <div className="container">
        {recentlyAdded.length > 0 && <MovieRow title="🔥 Recently Added" movies={recentlyAdded} />}
        <MovieRow title="🔥 Trending Now" movies={trending} />
        <MovieRow title="⭐ Popular Movies" movies={popular} />
        <MovieRow title="📺 Popular TV Shows" movies={popularTv} />
        <MovieRow title="🎬 Now Playing" movies={nowPlaying} />
        <MovieRow title="🌟 Popular People" movies={popularPeople} />
      </div>
      
      <Footer />
    </div>
  );
};

export default Home;