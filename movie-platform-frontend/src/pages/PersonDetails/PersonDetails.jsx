import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { tmdbService, getImageUrl } from '../../services/tmdb';
import MovieRow from '../../components/common/MovieRow/MovieRow';
import './PersonDetails.css';

const PersonDetails = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [movieCredits, setMovieCredits] = useState([]);
  const [tvCredits, setTvCredits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerson = async () => {
      setLoading(true);
      try {
        const { data } = await tmdbService.getPersonDetails(id);
        setPerson(data);
        
        // Sort credits by release date / first air date descending
        const sortedMovies = (data.movie_credits?.cast || []).sort((a, b) => {
          return new Date(b.release_date || '1900-01-01') - new Date(a.release_date || '1900-01-01');
        });
        const sortedTv = (data.tv_credits?.cast || []).sort((a, b) => {
          return new Date(b.first_air_date || '1900-01-01') - new Date(a.first_air_date || '1900-01-01');
        });

        setMovieCredits(sortedMovies);
        setTvCredits(sortedTv);
      } catch (error) {
        console.error('Error fetching person details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPerson();
  }, [id]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (!person) {
    return (
      <div className="container" style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Person not found</h2>
      </div>
    );
  }

  const profileUrl = getImageUrl(person.profile_path, 'h632');
  
  // Combine known_for from both TV and Movie credits, sorted by popularity
  const knownFor = [...movieCredits, ...tvCredits]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 10);



  // Calculate age
  let ageString = '';
  if (person.birthday) {
    const birth = new Date(person.birthday);
    const end = person.deathday ? new Date(person.deathday) : new Date();
    const age = end.getFullYear() - birth.getFullYear();
    ageString = ` (${age} years old)`;
  }



  return (
    <div className="person-details container">
      <div className="person-grid">
        {/* Left Column - Profile Info */}
        <aside className="person-sidebar">
          <img 
            src={profileUrl} 
            alt={person.name} 
            className="person-profile-img"
            onError={(e) => { e.target.src = '/placeholder.jpg'; }}
          />
          
          <div className="personal-info">
            <h3>Personal Info</h3>
            
            <div className="info-block">
              <strong>Known For</strong>
              <p>{person.known_for_department}</p>
            </div>
            

            
            <div className="info-block">
              <strong>Gender</strong>
              <p>{person.gender === 1 ? 'Female' : person.gender === 2 ? 'Male' : 'Not specified'}</p>
            </div>
            
            {person.birthday && (
              <div className="info-block">
                <strong>Birthdate</strong>
                <p>{person.birthday}{!person.deathday && ageString}</p>
              </div>
            )}
            
            {person.deathday && (
              <div className="info-block">
                <strong>Day of Death</strong>
                <p>{person.deathday}{ageString}</p>
              </div>
            )}
            
            <div className="info-block">
              <strong>Place of Birth</strong>
              <p>{person.place_of_birth || 'Unknown'}</p>
            </div>
            
            {person.also_known_as && person.also_known_as.length > 0 && (
              <div className="info-block">
                <strong>Also Known As</strong>
                {person.also_known_as.map((name, index) => (
                  <p key={index} className="aka-name">{name}</p>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* Right Column - Biography & Credits */}
        <main className="person-main">
          <h1 className="person-name">{person.name}</h1>
          
          <section className="biography-section">
            <h2>Biography</h2>
            <div className="biography-content">
              {person.biography ? (
                person.biography.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))
              ) : (
                <p>We don't have a biography for {person.name}.</p>
              )}
            </div>
          </section>

          {knownFor.length > 0 && (
            <section className="known-for-section">
              <MovieRow title="Known For" movies={knownFor} />
            </section>
          )}



        </main>
      </div>
    </div>
  );
};

export default PersonDetails;
