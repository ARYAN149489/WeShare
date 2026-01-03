import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { donationAPI } from '../../services/api';

const BrowseDonations = () => {
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    status: 'available'
  });

  useEffect(() => {
    fetchDonations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const fetchDonations = async () => {
    setLoading(true);
    try {
      const response = await donationAPI.getAll(filters);
      setDonations(response.data.donations);
    } catch (error) {
      console.error('Error fetching donations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container">
      <h1 className="mb-4">Browse Available Donations</h1>

      {/* Can't Find Button */}
      <div style={{
        background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
        padding: '1.5rem',
        borderRadius: '12px',
        marginBottom: '2rem',
        border: '2px solid #fcd34d',
        textAlign: 'center',
        boxShadow: '0 4px 15px rgba(252, 211, 77, 0.3)'
      }}>
        <h3 style={{ color: '#b45309', marginBottom: '0.75rem', fontSize: '1.25rem', fontWeight: 'bold' }}>
          Can't find something relevant? 🤔
        </h3>
        <p style={{ color: '#92400e', marginBottom: '1rem', fontSize: '0.95rem' }}>
          Request a specific donation and let donors know what you need!
        </p>
        <button
          onClick={() => navigate('/receiver/create-request')}
          style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white',
            border: 'none',
            padding: '0.875rem 2rem',
            fontSize: '1rem',
            fontWeight: 'bold',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(240, 147, 251, 0.4)'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(240, 147, 251, 0.5)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(240, 147, 251, 0.4)';
          }}
        >
          📢 Request a Donation
        </button>
      </div>

      {/* Filters */}
      <div className="card mb-4" style={{
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
        border: '2px solid #7dd3fc',
        boxShadow: '0 4px 15px rgba(56, 189, 248, 0.2)'
      }}>
        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ 
            color: '#0369a1', 
            fontSize: '1.25rem', 
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            🔍 Filter Donations
          </h3>
        </div>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" style={{ color: '#075985', fontWeight: '600', marginBottom: '0.75rem' }}>
            Select Category
          </label>
          <select
            name="category"
            className="form-select"
            value={filters.category}
            onChange={handleFilterChange}
            style={{
              padding: '0.875rem',
              borderRadius: '8px',
              border: '2px solid #7dd3fc',
              fontSize: '1rem',
              backgroundColor: 'white',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              fontWeight: '500',
              boxShadow: '0 2px 8px rgba(56, 189, 248, 0.15)'
            }}
          >
            <option value="">🌐 All Categories</option>
            <option value="food">🍽️ Food</option>
            <option value="clothes">👕 Clothes</option>
            <option value="blood">🩸 Blood</option>
            <option value="medicine">💊 Medicine</option>
            <option value="books">📚 Books</option>
            <option value="electronics">💻 Electronics</option>
            <option value="furniture">🪑 Furniture</option>
            <option value="other">📦 Other</option>
          </select>
        </div>
      </div>

      {/* Donations List */}
      {loading ? (
        <div className="loading">Loading donations...</div>
      ) : donations.length === 0 ? (
        <div className="empty-state">
          <h3 className="empty-state-title">No donations found</h3>
          <p>Check back later for new donations</p>
        </div>
      ) : (
        <div className="grid grid-cols-2">
          {donations.map((donation) => (
            <div key={donation._id} className="card">
              <div className="flex-between mb-2">
                <h3>{donation.title}</h3>
                <span className={`badge badge-${donation.status}`}>
                  {donation.status}
                </span>
              </div>
              
              <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
                {donation.description}
              </p>
              
              <div className="mb-2">
                <p><strong>Category:</strong> {donation.category}</p>
                <p><strong>Quantity:</strong> {donation.quantity}</p>
                {donation.address?.city && (
                  <p><strong>Location:</strong> {donation.address.city}, {donation.address.state}</p>
                )}
                {donation.donor && (
                  <p><strong>Donor:</strong> {donation.donor.name}</p>
                )}
              </div>

              <Link 
                to={`/receiver/donation/${donation._id}`} 
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                View Details & Request
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseDonations;
