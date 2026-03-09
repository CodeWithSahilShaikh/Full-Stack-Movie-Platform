import { Link } from 'react-router-dom';
import { getImageUrl } from '../../../services/tmdb';
import './PersonCard.css';

const PersonCard = ({ person }) => {
  const imageUrl = getImageUrl(person.profile_path);
  const name = person.name;
  const role = person.known_for_department;

  return (
    <Link to={`/person/${person.id}`} className="person-card">
      <div className="person-card-image">
        <img 
          src={imageUrl} 
          alt={name} 
          loading="lazy" 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/placeholder.jpg';
          }}
        />
        <div className="person-card-overlay">
          <span className="view-icon">👁️</span>
        </div>
      </div>
      <div className="person-card-info">
        <h3>{name}</h3>
        {role && <p className="person-role">{role}</p>}
      </div>
    </Link>
  );
};

export default PersonCard;
