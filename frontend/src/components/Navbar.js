import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout, isDonor, isReceiver } = useAuth();

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-brand">
          🤝 Donor-Receiver Platform
        </Link>
        
        <div className="navbar-menu">
          {isAuthenticated ? (
            <>
              <Link to="/" className="navbar-link">Home</Link>
              
              {isDonor && (
                <>
                  <Link to="/donor/donations" className="navbar-link">My Donations</Link>
                  <Link to="/donor/create" className="navbar-link">Create Donation</Link>
                  <Link to="/donor/requests" className="navbar-link">Manage Requests</Link>
                </>
              )}
              
              {isReceiver && (
                <>
                  <Link to="/receiver/browse" className="navbar-link">Browse Donations</Link>
                  <Link to="/receiver/requests" className="navbar-link">My Requests</Link>
                </>
              )}
              
              <Link to="/notifications" className="navbar-link">🔔 Notifications</Link>
              <Link to="/profile" className="navbar-link">Profile</Link>
              <button onClick={logout} className="btn btn-secondary">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
