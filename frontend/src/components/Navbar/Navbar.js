// Navbar.js
import React from 'react';
import { Link, useHistory } from 'react-router-dom'; // Import useHistory
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css';
import logo from './logo.png';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const history = useHistory(); // Initialize useHistory

  const handleLogout = () => {
    // Call the logout function
    logout();
    // Remove the token from localStorage
    localStorage.removeItem('authToken');
    // Redirect to the home page after successful logout
    history.push('/');
  };

  return (
    <div className="navbar">
      <div className="logo-container">
        <span>     ‎  </span>
        <span>     ‎  </span>
        <span>     ‎  </span>
        <span>     ‎  </span>
        <img src={logo} className="navbar-link" alt="Logo" />
      </div>
      <div className="navbar-items">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/contact" className="navbar-link">Contact</Link>
        {isAuthenticated ? (
          <>
            <button
              onClick={handleLogout}
              style={{ border: 'none', background: 'none', color: 'white', cursor: 'pointer' }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link">Login</Link>
            <Link to="/signup" className="navbar-link">Get Started</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
