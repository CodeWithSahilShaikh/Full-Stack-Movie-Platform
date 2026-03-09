import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { TbWorld } from 'react-icons/tb';
import './Footer.css';

const Footer = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [showUnauthorizedModal, setShowUnauthorizedModal] = useState(false);

  const handleAdminClick = (e) => {
    e.preventDefault();
    if (user?.role === 'admin') {
      navigate('/admin');
    } else {
      setShowUnauthorizedModal(true);
    }
  };
  return (
    <footer className="footer">
      <div className="container">
        
        <div className="footer-content">
          <div className="footer-brand">
            <Link to="/" className="logo">
              <span className="logo-white">Cine</span><span className="logo-red">Cloud</span>
            </Link>
            <p>
              Your ultimate cinematic journey begins here.
              Explore trending titles, curate your favorites, and track every watch.
            </p>
          </div>

          <div className="footer-nav-grid">
            <div className="footer-links">
              <h3>Explore</h3>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/explore">Movies</Link></li>
                <li><Link to="/explore/tv">TV Shows</Link></li>
              </ul>
            </div>

            <div className="footer-links">
              <h3>Account</h3>
              <ul>
                <li><Link to="/favorites">Favorites</Link></li>
                <li><Link to="/history">Watch History</Link></li>
                <li>
                  <a href="#" onClick={handleAdminClick} style={{ cursor: 'pointer' }}>
                    Admin Dashboard
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="social-icons">
            <a 
              href="https://github.com/CodeWithSahilShaikh" 
              target="_blank" 
              rel="noopener noreferrer"
              className="github"
              title="GitHub"
            >
              <FaGithub />
            </a>
            <a 
              href="https://www.linkedin.com/in/sahilshaikhhere/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="linkedin"
              title="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a 
              href="https://codewithsahilshaikh.github.io/My-Portfolio/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="portfolio"
              title="Portfolio"
            >
              <TbWorld />
            </a>
            <a 
              href="https://www.instagram.com/sahilshaikh.ai/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="instagram"
              title="Instagram"
            >
              <FaInstagram />
            </a>
          </div>
          
          <p className="copyright">© 2026 Sahil Shaikh. All rights reserved.</p>
        </div>

      </div>

      {/* Unauthorized Access Modal */}
      {showUnauthorizedModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          backdropFilter: 'blur(4px)'
        }}>
          <div style={{
            background: '#1a1a1a',
            padding: '40px',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
            textAlign: 'center',
            maxWidth: '400px',
            width: '90%'
          }}>
            <h2 style={{ margin: '0 0 16px 0', fontSize: '1.5rem', color: '#fff' }}>Unauthorized Access</h2>
            <p style={{ margin: '0 0 32px 0', color: '#999', lineHeight: '1.5' }}>
              Only Admin can Access it, Please Login using Admin Credentials
            </p>
            <button 
              onClick={() => setShowUnauthorizedModal(false)}
              style={{
                padding: '12px 32px',
                borderRadius: '8px',
                border: 'none',
                background: '#e50914',
                color: '#fff',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.2s ease',
                width: '100%'
              }}
              onMouseEnter={(e) => e.target.style.background = '#f40612'}
              onMouseLeave={(e) => e.target.style.background = '#e50914'}
            >
              Ok
            </button>
          </div>
        </div>
      )}

    </footer>
  );
};

export default Footer;
