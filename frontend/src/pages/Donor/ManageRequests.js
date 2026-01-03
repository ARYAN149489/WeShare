import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { donationAPI, requestAPI } from '../../services/api';

const ManageRequests = () => {
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedDonation, setExpandedDonation] = useState(null);
  const [requestsByDonation, setRequestsByDonation] = useState({});

  useEffect(() => {
    fetchDonationsWithRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDonationsWithRequests = async () => {
    try {
      const response = await donationAPI.getMyDonations();
      const donationsData = response.data.donations;
      setDonations(donationsData);

      // Fetch requests for each donation
      const requestsData = {};
      for (const donation of donationsData) {
        try {
          const reqResponse = await requestAPI.getByDonation(donation._id);
          requestsData[donation._id] = reqResponse.data.requests;
        } catch (error) {
          console.error(`Error fetching requests for donation ${donation._id}:`, error);
          requestsData[donation._id] = [];
        }
      }
      setRequestsByDonation(requestsData);
    } catch (error) {
      console.error('Error fetching donations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptRequest = async (donationId, requestId) => {
    if (window.confirm('Accept this request? The donation will be reserved for this receiver.')) {
      try {
        await donationAPI.acceptRequest(donationId, requestId);
        await fetchDonationsWithRequests();
        alert('Request accepted successfully!');
      } catch (error) {
        console.error('Error accepting request:', error);
        alert(error.response?.data?.message || 'Failed to accept request');
      }
    }
  };

  const handleRejectRequest = async (requestId) => {
    if (window.confirm('Reject this request?')) {
      try {
        await requestAPI.update(requestId, { status: 'rejected' });
        await fetchDonationsWithRequests();
        alert('Request rejected');
      } catch (error) {
        console.error('Error rejecting request:', error);
        alert('Failed to reject request');
      }
    }
  };

  const handleMarkCompleted = async (donationId) => {
    if (window.confirm('Mark this donation as fulfilled? This will notify the receiver that the donation is complete.')) {
      try {
        await donationAPI.markFulfilled(donationId);
        await fetchDonationsWithRequests();
        alert('Donation marked as fulfilled! Both you and the receiver have been notified.');
      } catch (error) {
        console.error('Error marking donation as fulfilled:', error);
        alert(error.response?.data?.message || 'Failed to mark donation as fulfilled');
      }
    }
  };

  const toggleDonation = (donationId) => {
    setExpandedDonation(expandedDonation === donationId ? null : donationId);
  };

  const getPendingRequestsCount = (donationId) => {
    const requests = requestsByDonation[donationId] || [];
    return requests.filter(r => r.status === 'pending').length;
  };

  const getTotalRequestsCount = (donationId) => {
    const requests = requestsByDonation[donationId] || [];
    return requests.length;
  };

  if (loading) {
    return <div className="loading">Loading requests...</div>;
  }

  const donationsWithRequests = donations.filter(d => getTotalRequestsCount(d._id) > 0);

  return (
    <div className="container">
      <h1>Manage Donation Requests</h1>
      <p className="mb-4">Review and respond to requests for your donations</p>

      {donationsWithRequests.length === 0 ? (
        <div className="empty-state">
          <h3 className="empty-state-title">No Requests Yet</h3>
          <p>You don't have any requests for your donations yet.</p>
          <button onClick={() => navigate('/donor/donations')} className="btn btn-primary mt-3">
            View My Donations
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1">
          {donationsWithRequests.map((donation) => {
            const requests = requestsByDonation[donation._id] || [];
            const pendingCount = getPendingRequestsCount(donation._id);
            const isExpanded = expandedDonation === donation._id;

            return (
              <div key={donation._id} className="card">
                <div 
                  className="flex-between"
                  style={{ cursor: 'pointer' }}
                  onClick={() => toggleDonation(donation._id)}
                >
                  <div style={{ flex: 1 }}>
                    <div className="flex gap-2" style={{ alignItems: 'center', marginBottom: '0.5rem' }}>
                      <h3>{donation.title}</h3>
                      <span className={`badge badge-${donation.status}`}>{donation.status}</span>
                      {pendingCount > 0 && (
                        <span className="badge" style={{ backgroundColor: '#ef4444', color: 'white' }}>
                          {pendingCount} pending
                        </span>
                      )}
                    </div>
                    <p><strong>Category:</strong> {donation.category} | <strong>Quantity:</strong> {donation.quantity}</p>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      Total Requests: {requests.length}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {donation.status === 'reserved' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkCompleted(donation._id);
                        }}
                        style={{
                          padding: '0.5rem 1rem',
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 6px 16px rgba(16, 185, 129, 0.4)';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
                        }}
                      >
                        ✓ Mark as Completed
                      </button>
                    )}
                    <span style={{ fontSize: '1.5rem', color: '#6b7280' }}>
                      {isExpanded ? '▼' : '▶'}
                    </span>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-3" style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
                    <h4 className="mb-3">Requests for this donation:</h4>
                    
                    {requests.length === 0 ? (
                      <p style={{ color: '#6b7280' }}>No requests yet</p>
                    ) : (
                      <div className="grid grid-cols-1 gap-3">
                        {requests.map((request) => (
                          <div 
                            key={request._id} 
                            className="card"
                            style={{ 
                              backgroundColor: request.status === 'pending' ? '#fef3c7' : '#f9fafb',
                              border: request.status === 'pending' ? '2px solid #f59e0b' : '1px solid #e5e7eb'
                            }}
                          >
                            <div className="flex-between">
                              <div style={{ flex: 1 }}>
                                <div className="flex gap-2" style={{ alignItems: 'center', marginBottom: '0.5rem' }}>
                                  <h4>{request.receiver?.name || 'Unknown'}</h4>
                                  <span className={`badge badge-${request.status}`}>{request.status}</span>
                                  <span className={`badge badge-${request.urgency}`}>{request.urgency} urgency</span>
                                </div>
                                
                                <p><strong>Email:</strong> {request.receiver?.email}</p>
                                <p><strong>Phone:</strong> {request.receiver?.phone || 'Not provided'}</p>
                                <p><strong>Message:</strong> {request.description}</p>
                                
                                {/* Show delivery address if pickup type is drop */}
                                {donation.pickupSchedule?.type === 'drop' && request.deliveryAddress && (
                                  <div style={{
                                    background: '#fef3c7',
                                    padding: '0.75rem',
                                    borderRadius: '6px',
                                    marginTop: '0.5rem',
                                    border: '1px solid #fcd34d'
                                  }}>
                                    <p><strong>📍 Delivery Address:</strong></p>
                                    <p style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
                                      {request.deliveryAddress.street}<br/>
                                      {request.deliveryAddress.city}, {request.deliveryAddress.state} {request.deliveryAddress.zipCode}<br/>
                                      {request.deliveryAddress.country}
                                    </p>
                                  </div>
                                )}
                                
                                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                                  Requested on: {new Date(request.createdAt).toLocaleString()}
                                </p>
                              </div>

                              <div className="flex gap-2" style={{ flexDirection: 'column' }}>
                                {request.status === 'pending' && donation.status === 'available' && (
                                  <>
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleAcceptRequest(donation._id, request._id);
                                      }}
                                      className="btn btn-success"
                                    >
                                      ✓ Accept
                                    </button>
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleRejectRequest(request._id);
                                      }}
                                      className="btn btn-danger"
                                    >
                                      ✗ Reject
                                    </button>
                                  </>
                                )}
                                {request.status === 'accepted' && (
                                  <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓ Accepted</span>
                                )}
                                {request.status === 'rejected' && (
                                  <span style={{ color: '#ef4444', fontWeight: 'bold' }}>✗ Rejected</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ManageRequests;
