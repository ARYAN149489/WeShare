import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { donationAPI } from '../../services/api';

const CreateDonation = () => {
  const [formData, setFormData] = useState({
    category: 'food',
    title: '',
    description: '',
    quantity: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    pickupDate: '',
    pickupTime: '',
    pickupType: 'pickup',
    expiryDate: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const donationData = {
        category: formData.category,
        title: formData.title,
        description: formData.description,
        quantity: formData.quantity,
        location: {
          type: 'Point',
          coordinates: [0, 0] // In production, use geocoding or user's actual coordinates
        },
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        },
        pickupSchedule: {
          date: formData.pickupDate,
          timeSlot: formData.pickupTime,
          type: formData.pickupType
        }
      };

      if (formData.expiryDate) {
        donationData.expiryDate = formData.expiryDate;
      }

      await donationAPI.create(donationData);
      navigate('/donor/donations');
    } catch (error) {
      console.error('Error creating donation:', error);
      setError(error.response?.data?.message || 'Failed to create donation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '900px', margin: '0 auto', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: '#4facfe', marginBottom: '0.5rem', fontSize: '2rem' }}>✨ Create New Donation</h1>
          <p style={{ color: '#6b7280' }}>Share what you have with those in need</p>
        </div>
        
        {error && (
          <div style={{
            background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
            border: '2px solid #ef4444',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1.5rem',
            color: '#991b1b'
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {/* Item Details Section */}
          <div style={{
            background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '2rem',
            border: '2px solid #bae6fd'
          }}>
            <h3 style={{ color: '#0284c7', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.5rem' }}>📦</span> Item Details
            </h3>
            
            <div className="grid grid-cols-2">
              <div className="form-group">
                <label style={{ fontWeight: 600, color: '#374151', marginBottom: '0.5rem', display: 'block' }}>
                  Category <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <select
                  name="category"
                  className="form-control"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  style={{ cursor: 'pointer' }}
                >
                  <option value="food">🍎 Food</option>
                  <option value="clothes">👔 Clothes</option>
                  <option value="blood">🩸 Blood</option>
                  <option value="medicine">💊 Medicine</option>
                  <option value="books">📚 Books</option>
                  <option value="electronics">💻 Electronics</option>
                  <option value="furniture">🪑 Furniture</option>
                  <option value="other">📌 Other</option>
                </select>
              </div>

              <div className="form-group">
                <label style={{ fontWeight: 600, color: '#374151', marginBottom: '0.5rem', display: 'block' }}>
                  Quantity <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  name="quantity"
                  className="form-control"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="e.g., 5 kg, 10 pieces, 2 boxes"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label style={{ fontWeight: 600, color: '#374151', marginBottom: '0.5rem', display: 'block' }}>
                Title <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Fresh vegetables and fruits"
                required
              />
            </div>

            <div className="form-group">
              <label style={{ fontWeight: 600, color: '#374151', marginBottom: '0.5rem', display: 'block' }}>
                Description <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <textarea
                name="description"
                className="form-control"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe what you're donating in detail..."
                required
                rows="4"
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label style={{ fontWeight: 600, color: '#374151', marginBottom: '0.5rem', display: 'block' }}>
                Expiry Date (Optional)
              </label>
              <input
                type="date"
                name="expiryDate"
                className="form-control"
                value={formData.expiryDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
              />
              <small style={{ color: '#6b7280', fontSize: '0.875rem' }}>Leave blank if item doesn't expire</small>
            </div>
          </div>

          {/* Schedule Section */}
          <div style={{
            background: 'linear-gradient(135deg, #dfe0fb 0%, #c7d2fe 100%)',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '2rem',
            border: '2px solid #a5b4fc'
          }}>
            <h3 style={{ color: '#4338ca', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.5rem' }}>📅</span> Pickup Schedule
            </h3>
            
            <div className="form-group">
              <label style={{ fontWeight: 600, color: '#374151', marginBottom: '0.5rem', display: 'block' }}>
                Pickup Type
              </label>
              <select
                name="pickupType"
                className="form-control"
                value={formData.pickupType}
                onChange={handleChange}
                style={{ cursor: 'pointer' }}
              >
                <option value="pickup">🚗 Receiver picks up from my location</option>
                <option value="drop">🚚 I will drop off to receiver</option>
              </select>
            </div>

            <div className="grid grid-cols-2">
              <div className="form-group">
                <label style={{ fontWeight: 600, color: '#374151', marginBottom: '0.5rem', display: 'block' }}>
                  Available Date
                </label>
                <input
                  type="date"
                  name="pickupDate"
                  className="form-control"
                  value={formData.pickupDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label style={{ fontWeight: 600, color: '#374151', marginBottom: '0.5rem', display: 'block' }}>
                  Time Slot
                </label>
                <input
                  type="text"
                  name="pickupTime"
                  className="form-control"
                  value={formData.pickupTime}
                  onChange={handleChange}
                  placeholder="e.g., 2:00 PM - 5:00 PM"
                />
              </div>
            </div>
          </div>

          {/* Location Section - Only show if pickup type is 'pickup' */}
          {formData.pickupType === 'pickup' && (
            <div style={{
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '2rem',
              border: '2px solid #fcd34d'
            }}>
              <h3 style={{ color: '#b45309', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.5rem' }}>📍</span> Pickup Location Details
              </h3>
              <p style={{ color: '#92400e', marginBottom: '1rem', fontSize: '0.95rem' }}>
                Provide your address where the receiver will pick up the donation
              </p>
              
              <div className="form-group">
                <label style={{ fontWeight: 600, color: '#374151', marginBottom: '0.5rem', display: 'block' }}>
                  Street Address
                </label>
                <input
                  type="text"
                  name="street"
                  className="form-control"
                  value={formData.street}
                  onChange={handleChange}
                  placeholder="Enter your street address"
                />
              </div>

              <div className="grid grid-cols-2">
                <div className="form-group">
                  <label style={{ fontWeight: 600, color: '#374151', marginBottom: '0.5rem', display: 'block' }}>
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    className="form-control"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                  />
                </div>

                <div className="form-group">
                  <label style={{ fontWeight: 600, color: '#374151', marginBottom: '0.5rem', display: 'block' }}>
                    State / Province
                  </label>
                  <input
                    type="text"
                    name="state"
                    className="form-control"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2">
                <div className="form-group">
                  <label style={{ fontWeight: 600, color: '#374151', marginBottom: '0.5rem', display: 'block' }}>
                    Zip / Postal Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    className="form-control"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="Zip Code"
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label style={{ fontWeight: 600, color: '#374151', marginBottom: '0.5rem', display: 'block' }}>
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    className="form-control"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Country"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-2" style={{ justifyContent: 'center', marginTop: '2rem' }}>
            <button type="submit" className="btn btn-primary" disabled={loading} style={{ minWidth: '150px', fontSize: '1.1rem', padding: '0.875rem 2rem' }}>
              {loading ? '⏳ Creating...' : '✓ Create Donation'}
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/donor/donations')} 
              className="btn btn-secondary"
              style={{ minWidth: '150px', fontSize: '1.1rem', padding: '0.875rem 2rem' }}
            >
              ✕ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDonation;
