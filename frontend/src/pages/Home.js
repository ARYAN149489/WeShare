import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated, isDonor, isReceiver } = useAuth();

  return (
    <div className="container">
      {!isAuthenticated ? (
        <div className="text-center" style={{ padding: '3rem 0' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            🤝 Welcome to Donor-Receiver Platform
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#6b7280', marginBottom: '2rem' }}>
            Connecting generous donors with those in need
          </p>
          
          <div className="grid grid-cols-2" style={{ maxWidth: '800px', margin: '0 auto 3rem' }}>
            <div className="card">
              <h3 className="mb-2">For Donors</h3>
              <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
                Share what you have with those who need it. Create donation listings,
                schedule pickups, and make a difference.
              </p>
              <Link to="/register" className="btn btn-primary">Become a Donor</Link>
            </div>
            
            <div className="card">
              <h3 className="mb-2">For Receivers</h3>
              <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
                Browse available donations, make requests, and receive help from
                generous community members.
              </p>
              <Link to="/register" className="btn btn-primary">Request Help</Link>
            </div>
          </div>

          <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="mb-3">How It Works</h2>
            <div className="grid grid-cols-3">
              <div>
                <h3 style={{ color: '#2563eb' }}>1. Sign Up</h3>
                <p style={{ color: '#6b7280' }}>
                  Create an account as a donor or receiver
                </p>
              </div>
              <div>
                <h3 style={{ color: '#2563eb' }}>2. Connect</h3>
                <p style={{ color: '#6b7280' }}>
                  Donors create listings, receivers browse and request
                </p>
              </div>
              <div>
                <h3 style={{ color: '#2563eb' }}>3. Help</h3>
                <p style={{ color: '#6b7280' }}>
                  Schedule pickups, fulfill requests, and make an impact
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="mb-4">Welcome back!</h1>
          
          {isDonor && (
            <div className="grid grid-cols-3">
              <Link to="/donor/create" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3 className="mb-2">➕ Create Donation</h3>
                <p style={{ color: '#6b7280' }}>
                  List a new item to donate
                </p>
              </Link>
              
              <Link to="/donor/donations" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3 className="mb-2">📦 My Donations</h3>
                <p style={{ color: '#6b7280' }}>
                  View and manage your donations
                </p>
              </Link>
              
              <Link to="/donor/browse-requests" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3 className="mb-2">📢 Browse Requests</h3>
                <p style={{ color: '#6b7280' }}>
                  View donation requests
                </p>
              </Link>
              
              <Link to="/donor/requests" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3 className="mb-2">📋 Manage Requests</h3>
                <p style={{ color: '#6b7280' }}>
                  Review and respond to requests
                </p>
              </Link>
              
              <Link to="/notifications" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3 className="mb-2">🔔 Notifications</h3>
                <p style={{ color: '#6b7280' }}>
                  Check your notifications
                </p>
              </Link>
            </div>
          )}
          
          {isReceiver && (
            <div className="grid grid-cols-3">
              <Link to="/receiver/browse" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3 className="mb-2">🔍 Browse Donations</h3>
                <p style={{ color: '#6b7280' }}>
                  Find available donations
                </p>
              </Link>
              
              <Link to="/receiver/create-request" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3 className="mb-2">📢 Request Donation</h3>
                <p style={{ color: '#6b7280' }}>
                  Request a specific donation
                </p>
              </Link>
              
              <Link to="/receiver/requests" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3 className="mb-2">📝 My Requests</h3>
                <p style={{ color: '#6b7280' }}>
                  Track your requests
                </p>
              </Link>
              
              <Link to="/notifications" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3 className="mb-2">🔔 Notifications</h3>
                <p style={{ color: '#6b7280' }}>
                  Check your notifications
                </p>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
