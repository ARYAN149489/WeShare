import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { donationAPI, requestAPI } from '../../services/api';

const RequestDonation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    urgency: 'medium',
    deliveryStreet: '',
    deliveryCity: '',
    deliveryState: '',
    deliveryZipCode: '',
    deliveryCountry: ''
  });

  useEffect(() => {
    fetchDonation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchDonation = async () => {
    try {
      const response = await donationAPI.getById(id);
      setDonation(response.data.donation);
    } catch (error) {
      console.error('Error fetching donation:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const requestData = {
        donationId: id,
        category: donation.category,
        title: `Request for ${donation.title}`,
        description: formData.description,
        quantity: donation.quantity,
        urgency: formData.urgency
      };

      // Add delivery address if pickup type is 'drop'
      if (donation.pickupSchedule?.type === 'drop') {
        requestData.deliveryAddress = {
          street: formData.deliveryStreet,
          city: formData.deliveryCity,
          state: formData.deliveryState,
          zipCode: formData.deliveryZipCode,
          country: formData.deliveryCountry
        };
      }

      await requestAPI.create(requestData);
      
      alert('Request submitted successfully!');
      navigate('/receiver/requests');
    } catch (error) {
      console.error('Error creating request:', error);
      alert('Failed to submit request');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!donation) {
    return <div className="container"><p>Donation not found</p></div>;
  }

  return (
    <div className="container">
      <button onClick={() => navigate('/receiver/browse')} className="btn btn-secondary mb-3">
        ← Back to Browse
      </button>

      <div className="grid grid-cols-2">
        {/* Donation Details */}
        <div className="card">
          <h2 className="card-header">Donation Details</h2>
          <div className="card-body">
            <h3 className="mb-2">{donation.title}</h3>
            <p className="mb-2"><strong>Category:</strong> {donation.category}</p>
            <p className="mb-2"><strong>Quantity:</strong> {donation.quantity}</p>
            <p className="mb-2"><strong>Description:</strong> {donation.description}</p>
            
            {donation.address && (
              <div className="mt-3">
                <strong>Location:</strong>
                <p>{donation.address.street}</p>
                <p>{donation.address.city}, {donation.address.state} {donation.address.zipCode}</p>
              </div>
            )}

            {donation.pickupSchedule?.date && (
              <div className="mt-3">
                <strong>Pickup Schedule:</strong>
                <p>{new Date(donation.pickupSchedule.date).toLocaleDateString()}</p>
                <p>{donation.pickupSchedule.timeSlot}</p>
                <p>Type: {donation.pickupSchedule.type}</p>
              </div>
            )}

            <div className="mt-3">
              <strong>Donor:</strong>
              <p>{donation.donor?.name}</p>
              <p>{donation.donor?.email}</p>
            </div>
          </div>
        </div>

        {/* Request Form */}
        <div className="card">
          {/* Gradient Header */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '2rem',
            borderRadius: '8px 8px 0 0',
            textAlign: 'center',
            marginBottom: '2rem',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
          }}>
            <h2 style={{ color: 'white', fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              📝 Submit Your Request
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', margin: 0 }}>
              Let the donor know why you need this donation
            </p>
          </div>
          
          {donation.status !== 'available' ? (
            <div className="alert alert-info">
              This donation is no longer available
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Blue Section: Request Details */}
              <div style={{
                background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                borderRadius: '8px',
                padding: '1.5rem',
                marginBottom: '1.5rem',
                border: '2px solid #93c5fd'
              }}>
                <h4 style={{ color: '#1e40af', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  💬 Request Details
                </h4>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ color: '#1e3a8a', fontWeight: '600' }}>Why do you need this? *</label>
                  <textarea
                    name="description"
                    className="form-textarea"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Share your story and explain why you need this donation..."
                    required
                    style={{
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: '2px solid #93c5fd',
                      fontSize: '0.95rem',
                      minHeight: '120px',
                      transition: 'all 0.3s ease',
                      backgroundColor: 'white'
                    }}
                  />
                </div>
              </div>

              {/* Purple Section: Urgency Level */}
              <div style={{
                background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
                borderRadius: '8px',
                padding: '1.5rem',
                marginBottom: '1.5rem',
                border: '2px solid #f9a8d4'
              }}>
                <h4 style={{ color: '#9d174d', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  ⚡ Urgency Level
                </h4>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ color: '#831843', fontWeight: '600' }}>How urgent is your need?</label>
                  <select
                    name="urgency"
                    className="form-select"
                    value={formData.urgency}
                    onChange={handleChange}
                    style={{
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: '2px solid #f9a8d4',
                      fontSize: '0.95rem',
                      backgroundColor: 'white',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <option value="low">🟢 Low - Can wait</option>
                    <option value="medium">🟡 Medium - Within a week</option>
                    <option value="high">🟠 High - Within a few days</option>
                    <option value="critical">🔴 Critical - Urgent need</option>
                  </select>
                </div>
              </div>

              {/* Show delivery address fields if pickup type is 'drop' */}
              {donation.pickupSchedule?.type === 'drop' && (
                <div style={{
                  background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                  borderRadius: '8px',
                  padding: '1rem',
                  marginBottom: '1rem',
                  border: '2px solid #fcd34d'
                }}>
                  <h4 style={{ color: '#b45309', marginBottom: '1rem' }}>📍 Delivery Address</h4>
                  <p style={{ fontSize: '0.875rem', color: '#92400e', marginBottom: '1rem' }}>
                    The donor will drop off the donation at this address
                  </p>

                  <div className="form-group">
                    <label className="form-label">Street Address *</label>
                    <input
                      type="text"
                      name="deliveryStreet"
                      className="form-control"
                      value={formData.deliveryStreet}
                      onChange={handleChange}
                      placeholder="Enter your street address"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2">
                    <div className="form-group">
                      <label className="form-label">City *</label>
                      <input
                        type="text"
                        name="deliveryCity"
                        className="form-control"
                        value={formData.deliveryCity}
                        onChange={handleChange}
                        placeholder="City"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">State *</label>
                      <input
                        type="text"
                        name="deliveryState"
                        className="form-control"
                        value={formData.deliveryState}
                        onChange={handleChange}
                        placeholder="State"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2">
                    <div className="form-group">
                      <label className="form-label">Zip Code *</label>
                      <input
                        type="text"
                        name="deliveryZipCode"
                        className="form-control"
                        value={formData.deliveryZipCode}
                        onChange={handleChange}
                        placeholder="Zip Code"
                        required
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Country *</label>
                      <input
                        type="text"
                        name="deliveryCountry"
                        className="form-control"
                        value={formData.deliveryCountry}
                        onChange={handleChange}
                        placeholder="Country"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={submitting}
                style={{ 
                  width: '100%',
                  background: submitting ? '#9ca3af' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  padding: '1rem',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: submitting ? 'none' : '0 4px 15px rgba(102, 126, 234, 0.4)',
                  transform: submitting ? 'none' : 'translateY(0)',
                  color: 'white'
                }}
                onMouseOver={(e) => !submitting && (e.target.style.transform = 'translateY(-2px)', e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)')}
                onMouseOut={(e) => !submitting && (e.target.style.transform = 'translateY(0)', e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)')}
              >
                {submitting ? '⏳ Submitting Request...' : '✅ Submit Request'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestDonation;
