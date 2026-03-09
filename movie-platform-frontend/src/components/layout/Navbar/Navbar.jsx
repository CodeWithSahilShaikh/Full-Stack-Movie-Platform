import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import ThemeToggle from './ThemeToggle';
import MobileMenu from './MobileMenu';
import ConfirmModal from '../../common/ConfirmModal/ConfirmModal';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on resize if screen becomes desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 968 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Close menu on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutConfirm(false);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="logo">
            <span className="logo-white">Cine</span><span className="logo-red">Cloud</span>
          </Link>

          <div className="nav-links">
            <Link to="/">Home</Link>
            <div className="dropdown">
              <span className="dropdown-title">Explore</span>
              <div className="dropdown-content">
                <Link to="/explore">Movies</Link>
                <Link to="/explore/tv">TV Shows</Link>
              </div>
            </div>
            <Link to="/search">Search</Link>
            <Link to="/people">People</Link>
            
            {isAuthenticated && (
              <>
                <Link to="/favorites">Favorites</Link>
                <Link to="/watch-later">Watch Later</Link>
                <Link to="/history">History</Link>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="admin-link">Admin</Link>
                )}
              </>
            )}
          </div>

          <div className="nav-actions">
            <ThemeToggle />
            <button 
              className="hamburger-btn" 
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <div className={`hamburger-icon ${isMobileMenuOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
            {isAuthenticated ? (
              <>
                <span className="username">Hi, {user?.username}</span>
                <button onClick={handleLogoutClick} className="btn-logout">
                  Logout
                </button>
              </>
            ) : (
               <>
                <Link to="/login" className="btn-login">Login</Link>
                <Link to="/register" className="btn-register">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>

      <MobileMenu 
        isOpen={isMobileMenuOpen}
        closeMenu={closeMobileMenu}
        isAuthenticated={isAuthenticated}
        user={user}
        handleLogoutClick={handleLogoutClick}
      />

      <ConfirmModal
        isOpen={showLogoutConfirm}
        title="Sign Out?"
        message="Are you sure you want to log out of your account?"
        confirmText="Yes, Sign Out"
        onConfirm={confirmLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </nav>
  );
};

export default Navbar;