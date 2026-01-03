import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { donationAPI } from '../../services/api';

const DonorDashboard = () => {
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    reserved: 0,
    fulfilled: 0
  });

  useEffect(() => {
    fetchDonations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await donationAPI.getMyDonations();
      const donationsList = response.data.donations;
      setDonations(donationsList);
      
      // Calculate stats
      setStats({
        total: donationsList.length,
        available: donationsList.filter(d => d.status === 'available').length,
        reserved: donationsList.filter(d => d.status === 'reserved').length,
        fulfilled: donationsList.filter(d => d.status === 'fulfilled').length
      });
    } catch (error) {
      console.error('Error fetching donations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this donation?')) {
      try {
        await donationAPI.delete(id);
        fetchDonations();
      } catch (error) {
        console.error('Error deleting donation:', error);
        alert('Failed to delete donation');
      }
    }
  };

  const handleMarkFulfilled = async (id) => {
    if (window.confirm('Mark this donation as fulfilled?')) {
      try {
        await donationAPI.markFulfilled(id);
        fetchDonations();
      } catch (error) {
        console.error('Error marking as fulfilled:', error);
        alert('Failed to update donation');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading your donations...</div>;
  }

  // Filter donations based on active filter
  const filteredDonations = activeFilter === 'all' 
    ? donations 
    : donations.filter(d => d.status === activeFilter);

  return (
    <div className="container">
      <div className="flex-between mb-4">
        <h1>My Donations</h1>
        <Link to="/donor/create" className="btn btn-primary">+ Create Donation</Link>
      </div>

      {/* Browse Requests Button */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '1.5rem',
        borderRadius: '12px',
        marginBottom: '2rem',
        textAlign: 'center',
        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
      }}>
        <h3 style={{ color: 'white', marginBottom: '0.75rem', fontSize: '1.25rem', fontWeight: 'bold' }}>
          📢 People Need Your Help!
        </h3>
        <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '1rem', fontSize: '0.95rem' }}>
          Browse donation requests from people in need and make a difference
        </p>
        <button
          onClick={() => navigate('/donor/browse-requests')}
          style={{
            background: 'white',
            color: '#667eea',
            border: 'none',
            padding: '0.875rem 2rem',
            fontSize: '1rem',
            fontWeight: 'bold',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(255, 255, 255, 0.3)'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(255, 255, 255, 0.4)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(255, 255, 255, 0.3)';
          }}
        >
          👀 Browse Donation Requests
        </button>
      </div>

      {/* Stats - Now clickable filters */}
      <div className="stats">
        <div 
          className="stat-card" 
          onClick={() => setActiveFilter('all')}
          style={{ 
            cursor: 'pointer',
            opacity: activeFilter === 'all' ? 1 : 0.7,
            transform: activeFilter === 'all' ? 'scale(1.05)' : 'scale(1)',
            border: activeFilter === 'all' ? '3px solid white' : 'none'
          }}
        >
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Donations</div>
        </div>
        <div 
          className="stat-card" 
          onClick={() => setActiveFilter('available')}
          style={{ 
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            cursor: 'pointer',
            opacity: activeFilter === 'available' ? 1 : 0.7,
            transform: activeFilter === 'available' ? 'scale(1.05)' : 'scale(1)',
            border: activeFilter === 'available' ? '3px solid white' : 'none'
          }}
        >
          <div className="stat-value">{stats.available}</div>
          <div className="stat-label">Available</div>
        </div>
        <div 
          className="stat-card" 
          onClick={() => setActiveFilter('reserved')}
          style={{ 
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            cursor: 'pointer',
            opacity: activeFilter === 'reserved' ? 1 : 0.7,
            transform: activeFilter === 'reserved' ? 'scale(1.05)' : 'scale(1)',
            border: activeFilter === 'reserved' ? '3px solid white' : 'none'
          }}
        >
          <div className="stat-value">{stats.reserved}</div>
          <div className="stat-label">Reserved</div>
        </div>
        <div 
          className="stat-card" 
          onClick={() => setActiveFilter('fulfilled')}
          style={{ 
            background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
            cursor: 'pointer',
            opacity: activeFilter === 'fulfilled' ? 1 : 0.7,
            transform: activeFilter === 'fulfilled' ? 'scale(1.05)' : 'scale(1)',
            border: activeFilter === 'fulfilled' ? '3px solid white' : 'none'
          }}
        >
          <div className="stat-value">{stats.fulfilled}</div>
          <div className="stat-label">Fulfilled</div>
        </div>
      </div>

      {/* Active Filter Indicator */}
      {activeFilter !== 'all' && (
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '1rem',
          padding: '0.75rem',
          background: 'white',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}>
          <span style={{ fontWeight: 600 }}>
            Showing: <span className={`badge badge-${activeFilter}`}>{activeFilter}</span> donations
          </span>
          <button 
            onClick={() => setActiveFilter('all')} 
            className="btn btn-secondary"
            style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}
          >
            Show All
          </button>
        </div>
      )}

      {/* Donations List */}
      {filteredDonations.length === 0 ? (
        <div className="empty-state">
          <h3 className="empty-state-title">
            {activeFilter === 'all' ? 'No donations yet' : `No ${activeFilter} donations`}
          </h3>
          <p>
            {activeFilter === 'all' 
              ? 'Create your first donation to help someone in need!' 
              : `You don't have any ${activeFilter} donations at the moment.`}
          </p>
          {activeFilter === 'all' ? (
            <Link to="/donor/create" className="btn btn-primary mt-3">Create Donation</Link>
          ) : (
            <button onClick={() => setActiveFilter('all')} className="btn btn-primary mt-3">
              Show All Donations
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1">
          {filteredDonations.map((donation) => (
            <div key={donation._id} className="card">
              <div className="flex-between">
                <div style={{ flex: 1 }}>
                  <div className="flex gap-2" style={{ alignItems: 'center', marginBottom: '0.5rem' }}>
                    <h3>{donation.title}</h3>
                    <span className={`badge badge-${donation.status}`}>
                      {donation.status}
                    </span>
                  </div>
                  <p style={{ color: '#6b7280', marginBottom: '0.5rem' }}>{donation.description}</p>
                  <p><strong>Category:</strong> {donation.category}</p>
                  <p><strong>Quantity:</strong> {donation.quantity}</p>
                  {donation.pickupSchedule?.date && (
                    <p><strong>Pickup:</strong> {new Date(donation.pickupSchedule.date).toLocaleDateString()} - {donation.pickupSchedule.timeSlot}</p>
                  )}
                  <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                    Created: {new Date(donation.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2" style={{ flexDirection: 'column' }}>
                  <Link to={`/donor/donations/${donation._id}`} className="btn btn-primary">
                    View Details
                  </Link>
                  {donation.status === 'reserved' && (
                    <button 
                      onClick={() => handleMarkFulfilled(donation._id)}
                      className="btn btn-success"
                    >
                      Mark Fulfilled
                    </button>
                  )}
                  {donation.status === 'available' && (
                    <>
                      <Link to={`/donor/edit/${donation._id}`} className="btn btn-secondary">
                        Edit
                      </Link>
                      <button 
                        onClick={() => handleDelete(donation._id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonorDashboard;
