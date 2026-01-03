import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestAPI } from '../../services/api';

const CreateDonationRequest = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    quantity: '',
    urgency: 'medium',
    deliveryStreet: '',
    deliveryCity: '',
    deliveryState: '',
    deliveryZipCode: '',
    deliveryCountry: ''
  });

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
        category: formData.category,
        title: formData.title,
        description: formData.description,
        quantity: formData.quantity,
        urgency: formData.urgency,
        deliveryAddress: {
          street: formData.deliveryStreet,
          city: formData.deliveryCity,
          state: formData.deliveryState,
          zipCode: formData.deliveryZipCode,
          country: formData.deliveryCountry
        }
      };

      await requestAPI.create(requestData);
      
      alert('Donation request created successfully! Donors can now view and respond to your request.');
      navigate('/receiver/requests');
    } catch (error) {
      console.error('Error creating request:', error);
      alert('Failed to create request');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <button onClick={() => navigate('/receiver/browse')} className="btn btn-secondary mb-3">
        ← Back to Browse
      </button>

      <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Gradient Header */}
        <div style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          padding: '2rem',
          borderRadius: '8px 8px 0 0',
          textAlign: 'center',
          marginBottom: '2rem',
          boxShadow: '0 4px 15px rgba(240, 147, 251, 0.3)'
        }}>
          <h2 style={{ color: 'white', fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            📢 Request a Donation
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', margin: 0 }}>
            Can't find what you need? Let donors know what you're looking for!
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Blue Section: Basic Information */}
          <div style={{
            background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
            borderRadius: '8px',
            padding: '1.5rem',
            marginBottom: '1.5rem',
            border: '2px solid #93c5fd'
          }}>
            <h4 style={{ color: '#1e40af', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              📋 Basic Information
            </h4>

            <div className="form-group">
              <label className="form-label" style={{ color: '#1e3a8a', fontWeight: '600' }}>Category *</label>
              <select
                name="category"
                className="form-select"
                value={formData.category}
                onChange={handleChange}
                required
                style={{
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '2px solid #93c5fd',
                  fontSize: '0.95rem',
                  backgroundColor: 'white',
                  transition: 'all 0.3s ease'
                }}
              >
                <option value="">Select a category</option>
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

            <div className="form-group">
              <label className="form-label" style={{ color: '#1e3a8a', fontWeight: '600' }}>What do you need? *</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Winter Clothes, Study Books, Rice and Dal"
                required
                style={{
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '2px solid #93c5fd',
                  fontSize: '0.95rem',
                  transition: 'all 0.3s ease'
                }}
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ color: '#1e3a8a', fontWeight: '600' }}>Quantity *</label>
              <input
                type="text"
                name="quantity"
                className="form-control"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="e.g., 5kg, 10 pieces, 1 bag"
                required
                style={{
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '2px solid #93c5fd',
                  fontSize: '0.95rem',
                  transition: 'all 0.3s ease'
                }}
              />
            </div>
          </div>

          {/* Green Section: Description */}
          <div style={{
            background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
            borderRadius: '8px',
            padding: '1.5rem',
            marginBottom: '1.5rem',
            border: '2px solid #6ee7b7'
          }}>
            <h4 style={{ color: '#065f46', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              💬 Tell Your Story
            </h4>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ color: '#064e3b', fontWeight: '600' }}>Why do you need this? *</label>
              <textarea
                name="description"
                className="form-textarea"
                value={formData.description}
                onChange={handleChange}
                placeholder="Share your story and why this donation would help you..."
                required
                style={{
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '2px solid #6ee7b7',
                  fontSize: '0.95rem',
                  minHeight: '120px',
                  transition: 'all 0.3s ease',
                  backgroundColor: 'white'
                }}
              />
            </div>
          </div>

          {/* Purple Section: Urgency */}
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

          {/* Orange Section: Delivery Address */}
          <div style={{
            background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            borderRadius: '8px',
            padding: '1.5rem',
            marginBottom: '1.5rem',
            border: '2px solid #fcd34d'
          }}>
            <h4 style={{ color: '#b45309', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              📍 Delivery Address
            </h4>
            <p style={{ fontSize: '0.875rem', color: '#92400e', marginBottom: '1rem' }}>
              Where should the donation be delivered?
            </p>

            <div className="form-group">
              <label className="form-label" style={{ color: '#78350f', fontWeight: '600' }}>Street Address *</label>
              <input
                type="text"
                name="deliveryStreet"
                className="form-control"
                value={formData.deliveryStreet}
                onChange={handleChange}
                placeholder="Enter your street address"
                required
                style={{
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '2px solid #fcd34d',
                  fontSize: '0.95rem',
                  transition: 'all 0.3s ease'
                }}
              />
            </div>

            <div className="grid grid-cols-2">
              <div className="form-group">
                <label className="form-label" style={{ color: '#78350f', fontWeight: '600' }}>City *</label>
                <input
                  type="text"
                  name="deliveryCity"
                  className="form-control"
                  value={formData.deliveryCity}
                  onChange={handleChange}
                  placeholder="City"
                  required
                  style={{
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '2px solid #fcd34d',
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease'
                  }}
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ color: '#78350f', fontWeight: '600' }}>State *</label>
                <input
                  type="text"
                  name="deliveryState"
                  className="form-control"
                  value={formData.deliveryState}
                  onChange={handleChange}
                  placeholder="State"
                  required
                  style={{
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '2px solid #fcd34d',
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease'
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2">
              <div className="form-group">
                <label className="form-label" style={{ color: '#78350f', fontWeight: '600' }}>Zip Code *</label>
                <input
                  type="text"
                  name="deliveryZipCode"
                  className="form-control"
                  value={formData.deliveryZipCode}
                  onChange={handleChange}
                  placeholder="Zip Code"
                  required
                  style={{
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '2px solid #fcd34d',
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease'
                  }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ color: '#78350f', fontWeight: '600' }}>Country *</label>
                <input
                  type="text"
                  name="deliveryCountry"
                  className="form-control"
                  value={formData.deliveryCountry}
                  onChange={handleChange}
                  placeholder="Country"
                  required
                  style={{
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '2px solid #fcd34d',
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease'
                  }}
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={submitting}
            style={{ 
              width: '100%',
              background: submitting ? '#9ca3af' : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              border: 'none',
              padding: '1rem',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              borderRadius: '8px',
              cursor: submitting ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: submitting ? 'none' : '0 4px 15px rgba(240, 147, 251, 0.4)',
              transform: submitting ? 'none' : 'translateY(0)',
              color: 'white'
            }}
            onMouseOver={(e) => !submitting && (e.target.style.transform = 'translateY(-2px)', e.target.style.boxShadow = '0 6px 20px rgba(240, 147, 251, 0.5)')}
            onMouseOut={(e) => !submitting && (e.target.style.transform = 'translateY(0)', e.target.style.boxShadow = '0 4px 15px rgba(240, 147, 251, 0.4)')}
          >
            {submitting ? '⏳ Creating Request...' : '📢 Post Your Request'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDonationRequest;
