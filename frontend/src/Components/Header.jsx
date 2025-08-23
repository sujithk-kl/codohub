import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Header.css';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('/api/auth/profile', { withCredentials: true });
      if (response.data.user) {
        setIsAuthenticated(true);
        setUser(response.data.user);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get('/api/auth/logout', { withCredentials: true });
      setIsAuthenticated(false);
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleHomeClick = () => {
    console.log('Home button clicked!'); // Debug log
    console.log('Current location:', location.pathname);
    
    if (location.pathname === '/') {
      // If already on home page, refresh the page
      console.log('Already on home page, refreshing...');
      window.location.reload();
    } else {
      // Navigate to home page
      console.log('Navigating to home...');
      navigate('/', { replace: true });
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <h1>CodeHub</h1>
          </Link>
          
          <nav className="nav">
            <button onClick={handleHomeClick} className="btn btn-secondary">Home</button>
            {isAuthenticated ? (
              <>
                <span className="user-info">Welcome, {user?.username}</span>
                <button onClick={handleLogout} className="btn btn-secondary">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary">Login</Link>
                <Link to="/register" className="btn btn-primary">Register</Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
