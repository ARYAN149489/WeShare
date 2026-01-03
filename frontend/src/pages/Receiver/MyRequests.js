import React, { useState, useEffect } from 'react';
import { requestAPI } from '../../services/api';

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await requestAPI.getMyRequests();
      setRequests(response.data.requests);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRateClick = (request) => {
    setSelectedRequest(request);
    setShowRatingModal(true);
  };

  const handleSubmitRating = async (e) => {
    e.preventDefault();
    
    try {
      await requestAPI.rate(selectedRequest._id, rating, feedback);
      alert('Rating submitted successfully!');
      setShowRatingModal(false);
      setSelectedRequest(null);
      setRating(5);
      setFeedback('');
      fetchRequests();
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Failed to submit rating');
    }
  };

  const handleCancelRequest = async (id) => {
    if (window.confirm('Are you sure you want to cancel this request?')) {
      try {
        await requestAPI.delete(id);
        fetchRequests();
      } catch (error) {
        console.error('Error cancelling request:', error);
        alert('Failed to cancel request');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading your requests...</div>;
  }

  return (
    <div className="container">
      <h1 className="mb-4">My Requests</h1>

      {requests.length === 0 ? (
        <div className="empty-state">
          <h3 className="empty-state-title">No requests yet</h3>
          <p>Browse available donations and submit a request!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1">
          {requests.map((request) => (
            <div key={request._id} className="card">
              <div className="flex-between">
                <div style={{ flex: 1 }}>
                  <div className="flex gap-2" style={{ alignItems: 'center', marginBottom: '0.5rem' }}>
                    <h3>{request.title}</h3>
                    <span className={`badge badge-${request.status}`}>
                      {request.status}
                    </span>
                    <span className={`badge badge-${request.urgency}`}>
                      {request.urgency} urgency
                    </span>
                  </div>
                  
                  <p style={{ color: '#6b7280', marginBottom: '0.5rem' }}>
                    {request.description}
                  </p>
                  
                  <p><strong>Category:</strong> {request.category}</p>
                  <p><strong>Quantity:</strong> {request.quantity}</p>
                  
                  {request.donation && (
                    <div className="mt-2">
                      <p><strong>Donation:</strong> {request.donation.title}</p>
                      {request.donation.donor && (
                        <p><strong>Donor:</strong> {request.donation.donor}</p>
                      )}
                    </div>
                  )}

                  {request.rating?.value && (
                    <div className="mt-2">
                      <p><strong>Your Rating:</strong> {'⭐'.repeat(request.rating.value)}</p>
                      {request.rating.feedback && (
                        <p><strong>Feedback:</strong> {request.rating.feedback}</p>
                      )}
                    </div>
                  )}
                  
                  <p style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '0.5rem' }}>
                    Created: {new Date(request.createdAt).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="flex gap-2" style={{ flexDirection: 'column' }}>
                  {request.status === 'pending' && (
                    <button 
                      onClick={() => handleCancelRequest(request._id)}
                      className="btn btn-danger"
                    >
                      Cancel Request
                    </button>
                  )}
                  
                  {request.status === 'fulfilled' && !request.rating?.value && (
                    <button 
                      onClick={() => handleRateClick(request)}
                      className="btn btn-success"
                    >
                      Rate Donation
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Rating Modal */}
      {showRatingModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div className="card" style={{ width: '500px', maxWidth: '90%' }}>
            <h2 className="card-header">Rate Donation</h2>
            
            <form onSubmit={handleSubmitRating}>
              <div className="form-group">
                <label className="form-label">Rating (1-5 stars)</label>
                <select
                  className="form-select"
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                >
                  <option value="1">1 Star</option>
                  <option value="2">2 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="5">5 Stars</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Feedback (Optional)</label>
                <textarea
                  className="form-textarea"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Share your experience..."
                />
              </div>

              <div className="flex gap-2">
                <button type="submit" className="btn btn-primary">
                  Submit Rating
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    setShowRatingModal(false);
                    setSelectedRequest(null);
                    setRating(5);
                    setFeedback('');
                  }}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRequests;
