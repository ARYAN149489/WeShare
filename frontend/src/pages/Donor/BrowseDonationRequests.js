import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Use environment variable for API URL, fallback to localhost for development
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const BrowseDonationRequests = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fulfilling, setFulfilling] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    urgency: ''
  });

  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const params = {};
      if (filters.category) params.category = filters.category;
      if (filters.urgency) params.urgency = filters.urgency;      const response = await axios.get(`${API_URL}/requests/all-open`, {
        headers: { 'x-auth-token': token },
        params
      });
      setRequests(response.data.requests);
    } catch (error) {
      console.error('Error fetching requests:', error);
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

  const handleFulfillRequest = async () => {
    setShowModal(false);
    setFulfilling(selectedRequest._id);
    try {      const token = localStorage.getItem('token');
      await axios.post(
        `${API_URL}/requests/${selectedRequest._id}/fulfill`,
        {},
        { headers: { 'x-auth-token': token } }
      );

      // Show success message
      const successDiv = document.createElement('div');
      successDiv.style.cssText = 'position: fixed; top: 20px; right: 20px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 1.5rem 2rem; border-radius: 12px; box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4); z-index: 9999; font-weight: 600; animation: slideInRight 0.5s ease-out;';
      successDiv.innerHTML = '✅ Request fulfilled successfully! The requester has been notified via email.';
      document.body.appendChild(successDiv);
      setTimeout(() => successDiv.remove(), 4000);

      navigate('/donor/requests');
    } catch (error) {
      console.error('Error fulfilling request:', error);
      const errorDiv = document.createElement('div');
      errorDiv.style.cssText = 'position: fixed; top: 20px; right: 20px; background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 1.5rem 2rem; border-radius: 12px; box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4); z-index: 9999; font-weight: 600; animation: slideInRight 0.5s ease-out;';
      errorDiv.innerHTML = `❌ ${error.response?.data?.message || 'Failed to fulfill request'}`;
      document.body.appendChild(errorDiv);
      setTimeout(() => errorDiv.remove(), 4000);
    } finally {
      setFulfilling(null);
      setSelectedRequest(null);
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'critical': return '#dc2626';
      case 'high': return '#f59e0b';
      case 'medium': return '#eab308';
      case 'low': return '#22c55e';
      default: return '#6b7280';
    }
  };

  const getUrgencyEmoji = (urgency) => {
    switch (urgency) {
      case 'critical': return '🔴';
      case 'high': return '🟠';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  return (
    <div className="container">
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2rem',
        borderRadius: '12px',
        textAlign: 'center',
        marginBottom: '2rem',
        boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)'
      }}>
        <h1 style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          📢 Donation Requests
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem', margin: 0 }}>
          Browse requests from people in need and make a difference
        </p>
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
            🔍 Filter Requests
          </h3>
        </div>
        <div className="grid grid-cols-2">
          <div className="form-group">
            <label className="form-label" style={{ color: '#075985', fontWeight: '600' }}>Category</label>
            <select
              name="category"
              className="form-select"
              value={filters.category}
              onChange={handleFilterChange}
              style={{
                padding: '0.75rem',
                borderRadius: '8px',
                border: '2px solid #7dd3fc',
                fontSize: '0.95rem',
                backgroundColor: 'white',
                transition: 'all 0.3s ease'
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

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ color: '#075985', fontWeight: '600' }}>Urgency</label>
            <select
              name="urgency"
              className="form-select"
              value={filters.urgency}
              onChange={handleFilterChange}
              style={{
                padding: '0.75rem',
                borderRadius: '8px',
                border: '2px solid #7dd3fc',
                fontSize: '0.95rem',
                backgroundColor: 'white',
                transition: 'all 0.3s ease'
              }}
            >
              <option value="">All Urgency Levels</option>
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🟠 High</option>
              <option value="critical">🔴 Critical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Requests List */}
      {loading ? (
        <div className="loading">Loading requests...</div>
      ) : requests.length === 0 ? (
        <div className="empty-state">
          <h3 className="empty-state-title">No donation requests found</h3>
          <p>Check back later or adjust your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-2">
          {requests.map((request) => (
            <div key={request._id} className="card" style={{
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '';
            }}
            >
              <div className="flex-between mb-2">
                <h3 style={{ color: '#1f2937', marginBottom: '0.5rem' }}>{request.title}</h3>
                <span style={{
                  padding: '0.375rem 0.75rem',
                  borderRadius: '12px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  background: getUrgencyColor(request.urgency),
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  {getUrgencyEmoji(request.urgency)} {request.urgency}
                </span>
              </div>
              
              <p style={{ color: '#6b7280', marginBottom: '1rem', lineHeight: '1.5' }}>
                {request.description.length > 150 
                  ? request.description.substring(0, 150) + '...' 
                  : request.description}
              </p>
              
              <div style={{ marginBottom: '1rem', fontSize: '0.95rem' }}>
                <p style={{ marginBottom: '0.5rem' }}>
                  <strong style={{ color: '#374151' }}>Category:</strong> 
                  <span style={{ color: '#6b7280', marginLeft: '0.5rem' }}>{request.category}</span>
                </p>
                <p style={{ marginBottom: '0.5rem' }}>
                  <strong style={{ color: '#374151' }}>Quantity:</strong> 
                  <span style={{ color: '#6b7280', marginLeft: '0.5rem' }}>{request.quantity}</span>
                </p>
                {request.deliveryAddress?.city && (
                  <p style={{ marginBottom: '0.5rem' }}>
                    <strong style={{ color: '#374151' }}>Location:</strong> 
                    <span style={{ color: '#6b7280', marginLeft: '0.5rem' }}>
                      {request.deliveryAddress.city}, {request.deliveryAddress.state}
                    </span>
                  </p>
                )}
                {request.receiver && (
                  <p style={{ marginBottom: '0.5rem' }}>
                    <strong style={{ color: '#374151' }}>Requested by:</strong> 
                    <span style={{ color: '#6b7280', marginLeft: '0.5rem' }}>{request.receiver.name}</span>
                  </p>
                )}
                <p style={{ marginBottom: 0 }}>
                  <strong style={{ color: '#374151' }}>Posted:</strong> 
                  <span style={{ color: '#6b7280', marginLeft: '0.5rem' }}>
                    {new Date(request.createdAt).toLocaleDateString()}
                  </span>
                </p>
              </div>

              <div style={{
                padding: '1rem',
                background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                borderRadius: '8px',
                marginBottom: '1rem',
                border: '1px solid #fcd34d'
              }}>
                <p style={{ fontSize: '0.875rem', color: '#78350f', marginBottom: '0.5rem', fontWeight: '600' }}>
                  📍 Delivery Address:
                </p>
                <p style={{ fontSize: '0.875rem', color: '#92400e', margin: 0 }}>
                  {request.deliveryAddress?.street}, {request.deliveryAddress?.city}, {request.deliveryAddress?.state} {request.deliveryAddress?.zipCode}
                </p>
              </div>

              <button
                onClick={() => {
                  setSelectedRequest(request);
                  setShowModal(true);
                }}
                disabled={fulfilling === request._id}
                style={{ 
                  width: '100%',
                  background: fulfilling === request._id ? '#9ca3af' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  padding: '0.75rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  color: 'white',
                  borderRadius: '8px',
                  cursor: fulfilling === request._id ? 'not-allowed' : 'pointer',
                  boxShadow: fulfilling === request._id ? 'none' : '0 4px 15px rgba(102, 126, 234, 0.4)'
                }}
                onMouseOver={(e) => {
                  if (fulfilling !== request._id) {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
                  }
                }}
                onMouseOut={(e) => {
                  if (fulfilling !== request._id) {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                  }
                }}
              >
                {fulfilling === request._id ? '⏳ Fulfilling Request...' : '❤️ Fulfill This Request'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      {showModal && selectedRequest && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            animation: 'fadeIn 0.3s ease-in',
            backdropFilter: 'blur(5px)'
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '16px',
              maxWidth: '500px',
              width: '90%',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
              animation: 'scaleIn 0.3s ease-out'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '1.5rem',
              borderRadius: '12px',
              textAlign: 'center',
              marginBottom: '1.5rem'
            }}>
              <h2 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                ❤️ Fulfill This Request?
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', margin: 0 }}>
                Help someone in need today!
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '1rem', color: '#374151', marginBottom: '1rem', lineHeight: '1.6' }}>
                You're about to fulfill the request for:
              </p>
              <div style={{
                background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                padding: '1rem',
                borderRadius: '8px',
                border: '2px solid #93c5fd',
                marginBottom: '1rem'
              }}>
                <p style={{ fontWeight: 'bold', color: '#1e40af', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                  {selectedRequest.title}
                </p>
                <p style={{ color: '#1e3a8a', fontSize: '0.9rem' }}>
                  Quantity: {selectedRequest.quantity}
                </p>
              </div>
              <p style={{ fontSize: '0.95rem', color: '#6b7280', lineHeight: '1.6' }}>
                This will:
              </p>
              <ul style={{ color: '#374151', fontSize: '0.9rem', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                <li>✅ Create a reserved donation</li>
                <li>📧 Send email notification to the requester</li>
                <li>🔔 Create an in-app notification</li>
                <li>📍 Set delivery to their address</li>
              </ul>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  flex: 1,
                  padding: '0.875rem',
                  border: '2px solid #e5e7eb',
                  background: 'white',
                  color: '#6b7280',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = '#f3f4f6';
                  e.target.style.borderColor = '#9ca3af';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'white';
                  e.target.style.borderColor = '#e5e7eb';
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleFulfillRequest}
                style={{
                  flex: 1,
                  padding: '0.875rem',
                  border: 'none',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                }}
              >
                ✅ Yes, Fulfill Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowseDonationRequests;
