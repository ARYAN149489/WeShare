import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { donationAPI, requestAPI } from '../../services/api';

const DonationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [donation, setDonation] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDonationDetails();
    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchDonationDetails = async () => {
    try {
      const response = await donationAPI.getById(id);
      setDonation(response.data.donation);
    } catch (error) {
      console.error('Error fetching donation:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRequests = async () => {
    try {
      const response = await requestAPI.getByDonation(id);
      setRequests(response.data.requests);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const handleAcceptRequest = async (requestId) => {
    if (window.confirm('Accept this request?')) {
      try {
        await donationAPI.acceptRequest(id, requestId);
        fetchDonationDetails();
        fetchRequests();
        alert('Request accepted successfully!');
      } catch (error) {
        console.error('Error accepting request:', error);
        alert('Failed to accept request');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading donation details...</div>;
  }

  if (!donation) {
    return <div className="container"><p>Donation not found</p></div>;
  }

  return (
    <div className="container">
      <button onClick={() => navigate('/donor/donations')} className="btn btn-secondary mb-3">
        ← Back to Donations
      </button>

      <div className="card">
        <div className="flex-between mb-3">
          <h2>{donation.title}</h2>
          <span className={`badge badge-${donation.status}`}>{donation.status}</span>
        </div>

        <div className="grid grid-cols-2">
          <div>
            <p className="mb-2"><strong>Category:</strong> {donation.category}</p>
            <p className="mb-2"><strong>Quantity:</strong> {donation.quantity}</p>
            <p className="mb-2"><strong>Description:</strong> {donation.description}</p>
          </div>
          <div>
            {donation.address && (
              <div className="mb-2">
                <strong>Location:</strong>
                <p>{donation.address.street}</p>
                <p>{donation.address.city}, {donation.address.state} {donation.address.zipCode}</p>
                <p>{donation.address.country}</p>
              </div>
            )}
            {donation.pickupSchedule?.date && (
              <div className="mb-2">
                <strong>Schedule:</strong>
                <p>{new Date(donation.pickupSchedule.date).toLocaleDateString()}</p>
                <p>{donation.pickupSchedule.timeSlot}</p>
                <p>Type: {donation.pickupSchedule.type}</p>
              </div>
            )}
          </div>
        </div>

        {donation.receiverId && (
          <div className="mt-3">
            <h3>Receiver Information</h3>
            <p><strong>Name:</strong> {donation.receiverId.name}</p>
            <p><strong>Email:</strong> {donation.receiverId.email}</p>
            <p><strong>Phone:</strong> {donation.receiverId.phone}</p>
          </div>
        )}
      </div>

      {requests.length > 0 && (
        <div className="card mt-3">
          <h3 className="card-header">Requests ({requests.filter(r => r.status === 'pending').length} pending, {requests.length} total)</h3>
          <div className="grid grid-cols-1">
            {requests.map((request) => (
              <div key={request._id} className="card">
                <div className="flex-between">
                  <div>
                    <h4>{request.receiver?.name}</h4>
                    <p><strong>Email:</strong> {request.receiver?.email}</p>
                    <p><strong>Phone:</strong> {request.receiver?.phone}</p>
                    <p><strong>Message:</strong> {request.description}</p>
                    <p><strong>Urgency:</strong> <span className={`badge badge-${request.urgency}`}>{request.urgency}</span></p>
                    <p><strong>Status:</strong> <span className={`badge badge-${request.status}`}>{request.status}</span></p>
                    <p><strong>Date:</strong> {new Date(request.createdAt).toLocaleString()}</p>
                  </div>
                  <div>
                    {request.status === 'pending' && donation.status === 'available' && (
                      <button 
                        onClick={() => handleAcceptRequest(request._id)}
                        className="btn btn-success"
                      >
                        Accept Request
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationDetails;
