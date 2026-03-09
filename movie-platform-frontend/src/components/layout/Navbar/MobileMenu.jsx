import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const MobileMenu = ({ 
  isOpen, 
  closeMenu, 
  isAuthenticated, 
  user, 
  handleLogoutClick 
}) => {
  return (
    <>
      <div 
        className={`mobile-menu-overlay ${isOpen ? 'open' : ''}`}
        onClick={closeMenu}
      ></div>

      <div className={`mobile-nav-drawer ${isOpen ? 'open' : ''}`}>
        <div className="mobile-nav-header">
          <Link to="/" className="logo" onClick={closeMenu}>
            <span className="logo-white">Cine</span><span className="logo-red">Cloud</span>
          </Link>
          <button 
            className="mobile-close-btn" 
            onClick={closeMenu}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        
        <div className="mobile-nav-content">
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/explore" onClick={closeMenu}>Explore Movies</Link>
          <Link to="/explore/tv" onClick={closeMenu}>Explore TV Shows</Link>
          <Link to="/search" onClick={closeMenu}>Search</Link>
          <Link to="/people" onClick={closeMenu}>People</Link>
          
          {isAuthenticated && (
            <div className="mobile-auth-links">
              <div className="mobile-nav-divider"></div>
              <span className="mobile-section-title">My Account</span>
              <Link to="/favorites" onClick={closeMenu}>Favorites</Link>
              <Link to="/watch-later" onClick={closeMenu}>Watch Later</Link>
              <Link to="/history" onClick={closeMenu}>History</Link>
              {user?.role === 'admin' && (
                <Link to="/admin" className="admin-link mobile-admin" onClick={closeMenu}>Admin</Link>
              )}
            </div>
          )}
        </div>

        <div className="mobile-nav-footer">
          <ThemeToggle isMobile onClick={closeMenu} />
          
          {isAuthenticated ? (
            <div className="mobile-user-actions">
              <span className="mobile-username">Hi, {user?.username}</span>
              <button 
                onClick={() => { closeMenu(); handleLogoutClick(); }} 
                className="btn-logout mobile-logout"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="mobile-login-actions">
              <Link to="/login" className="btn-login" onClick={closeMenu}>Login</Link>
              <Link to="/register" className="btn-register" onClick={closeMenu}>Register</Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
