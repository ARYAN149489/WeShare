import React, { useState, useEffect } from 'react';
import { userAPI } from '../services/api';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    availability: true
  });

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await userAPI.getProfile();
      const userData = response.data.user;
      setUser(userData);
      setFormData({
        name: userData.name || '',
        phone: userData.phone || '',
        street: userData.address?.street || '',
        city: userData.address?.city || '',
        state: userData.address?.state || '',
        zipCode: userData.address?.zipCode || '',
        country: userData.address?.country || '',
        availability: userData.availability !== undefined ? userData.availability : true
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await userAPI.updateProfile({
        name: formData.name,
        phone: formData.phone,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        },
        availability: formData.availability
      });
      
      alert('Profile updated successfully!');
      setEditing(false);
      fetchProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="flex-between mb-3">
          <h2>My Profile</h2>
          {!editing && (
            <button onClick={() => setEditing(true)} className="btn btn-primary">
              Edit Profile
            </button>
          )}
        </div>

        {editing ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-input"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                value={user?.email}
                disabled
                style={{ backgroundColor: '#f3f4f6' }}
              />
              <small style={{ color: '#6b7280' }}>Email cannot be changed</small>
            </div>

            <div className="form-group">
              <label className="form-label">Role</label>
              <input
                type="text"
                className="form-input"
                value={user?.role}
                disabled
                style={{ backgroundColor: '#f3f4f6', textTransform: 'capitalize' }}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                name="phone"
                className="form-input"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {user?.role === 'donor' && (
              <div className="form-group">
                <label className="flex gap-2" style={{ alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    name="availability"
                    checked={formData.availability}
                    onChange={handleChange}
                  />
                  <span>Available for donations</span>
                </label>
              </div>
            )}

            <h3 className="mt-3 mb-2">Address</h3>

            <div className="form-group">
              <label className="form-label">Street</label>
              <input
                type="text"
                name="street"
                className="form-input"
                value={formData.street}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2">
              <div className="form-group">
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="city"
                  className="form-input"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">State</label>
                <input
                  type="text"
                  name="state"
                  className="form-input"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2">
              <div className="form-group">
                <label className="form-label">Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  className="form-input"
                  value={formData.zipCode}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Country</label>
                <input
                  type="text"
                  name="country"
                  className="form-input"
                  value={formData.country}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
              <button 
                type="button" 
                onClick={() => {
                  setEditing(false);
                  fetchProfile();
                }}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div>
            <div className="mb-3">
              <p><strong>Name:</strong> {user?.name}</p>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Role:</strong> <span style={{ textTransform: 'capitalize' }}>{user?.role}</span></p>
              <p><strong>Phone:</strong> {user?.phone || 'Not provided'}</p>
              {user?.role === 'donor' && (
                <p>
                  <strong>Status:</strong>{' '}
                  <span className={`badge ${user?.availability ? 'badge-available' : 'badge-reserved'}`}>
                    {user?.availability ? 'Available' : 'Unavailable'}
                  </span>
                </p>
              )}
            </div>

            {user?.address && (user?.address.street || user?.address.city) && (
              <div className="mt-3">
                <h3 className="mb-2">Address</h3>
                {user?.address.street && <p>{user.address.street}</p>}
                {user?.address.city && (
                  <p>
                    {user.address.city}
                    {user.address.state && `, ${user.address.state}`}
                    {user.address.zipCode && ` ${user.address.zipCode}`}
                  </p>
                )}
                {user?.address.country && <p>{user.address.country}</p>}
              </div>
            )}

            <p className="mt-3" style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
              Member since: {new Date(user?.createdAt).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
