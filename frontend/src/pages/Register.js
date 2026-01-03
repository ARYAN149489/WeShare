import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'donor',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      phone: formData.phone,
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country
      }
    };

    const result = await register(userData);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="page-container" style={{ 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem'
    }}>
      <div className="card" style={{ 
        maxWidth: '700px', 
        width: '100%',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
        borderRadius: '16px',
        overflow: 'hidden'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          padding: '2.5rem 2rem',
          color: 'white',
          textAlign: 'center'
        }}>
          <h2 style={{ 
            margin: 0,
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}>
            <span style={{ fontSize: '2.5rem' }}>🎉</span>
            Join WeShare
          </h2>
          <p style={{ margin: 0, opacity: 0.9 }}>Create your account and start making a difference!</p>
        </div>
        
        <div style={{ padding: '2rem' }}>
          {error && (
            <div className="alert alert-error" style={{
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              background: '#fee',
              border: '1px solid #fcc',
              color: '#c33'
            }}>
              ⚠️ {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            {/* Personal Information Section */}
            <div style={{
              background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '1.5rem',
              border: '2px solid #90caf9'
            }}>
              <h3 style={{ 
                color: '#1976d2',
                marginBottom: '1.25rem',
                fontSize: '1.1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{ fontSize: '1.5rem' }}>👤</span> Personal Information
              </h3>
              
              <div className="form-group">
                <label style={{ fontWeight: 600, color: '#374151', marginBottom: '0.5rem', display: 'block' }}>
                  Full Name <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  style={{ 
                    padding: '0.75rem',
                    fontSize: '1rem',
                    borderRadius: '8px',
                    border: '2px solid #e5e7eb',
                    transition: 'all 0.3s ease'
                  }}
                />
              </div>

              <div className="form-group">
                <label style={{ fontWeight: 600, color: '#374151', marginBottom: '0.5rem', display: 'block' }}>
                  Email Address <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                  style={{ 
                    padding: '0.75rem',
                    fontSize: '1rem',
                    borderRadius: '8px',
                    border: '2px solid #e5e7eb',
                    transition: 'all 0.3s ease'
                  }}
                />
              </div>

              <div className="form-group">
                <label style={{ fontWeight: 600, color: '#374151', marginBottom: '0.5rem', display: 'block' }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="form-input"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91-9876543210"
                  style={{ 
                    padding: '0.75rem',
                    fontSize: '1rem',
                    borderRadius: '8px',
                    border: '2px solid #e5e7eb',
                    transition: 'all 0.3s ease'
                  }}
                />
              </div>
            </div>

            {/* Account Security Section */}
            <div style={{
              background: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '1.5rem',
              border: '2px solid #ce93d8'
            }}>
              <h3 style={{ 
                color: '#7b1fa2',
                marginBottom: '1.25rem',
                fontSize: '1.1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{ fontSize: '1.5rem' }}>🔐</span> Account Security
              </h3>
              
              <div className="form-group">
                <label style={{ fontWeight: 600, color: '#374151', marginBottom: '0.5rem', display: 'block' }}>
                  Password <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-input"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimum 6 characters"
                  required
                  style={{ 
                    padding: '0.75rem',
                    fontSize: '1rem',
                    borderRadius: '8px',
                    border: '2px solid #e5e7eb',
                    transition: 'all 0.3s ease'
                  }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label style={{ fontWeight: 600, color: '#374151', marginBottom: '0.5rem', display: 'block' }}>
                  Confirm Password <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-input"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  required
                  style={{ 
                    padding: '0.75rem',
                    fontSize: '1rem',
                    borderRadius: '8px',
                    border: '2px solid #e5e7eb',
                    transition: 'all 0.3s ease'
                  }}
                />
              </div>
            </div>

            {/* Account Type Section */}
            <div style={{
              background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '1.5rem',
              border: '2px solid #a5d6a7'
            }}>
              <h3 style={{ 
                color: '#388e3c',
                marginBottom: '1.25rem',
                fontSize: '1.1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{ fontSize: '1.5rem' }}>🎯</span> Account Type
              </h3>
              
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label style={{ fontWeight: 600, color: '#374151', marginBottom: '0.5rem', display: 'block' }}>
                  I want to <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <select
                  name="role"
                  className="form-select"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  style={{ 
                    padding: '0.75rem',
                    fontSize: '1rem',
                    borderRadius: '8px',
                    border: '2px solid #e5e7eb',
                    cursor: 'pointer',
                    background: 'white',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <option value="donor">🎁 Donate items (Donor)</option>
                  <option value="receiver">🙏 Request items (Receiver)</option>
                </select>
              </div>
            </div>

            {/* Address Section */}
            <div style={{
              background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '1.5rem',
              border: '2px solid #ffcc80'
            }}>
              <h3 style={{ 
                color: '#e65100',
                marginBottom: '1.25rem',
                fontSize: '1.1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{ fontSize: '1.5rem' }}>📍</span> Address Details
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem' }}>
                Optional but recommended for better location-based matching
              </p>

              <div className="form-group">
                <label style={{ fontWeight: 600, color: '#374151', marginBottom: '0.5rem', display: 'block' }}>
                  Street Address
                </label>
                <input
                  type="text"
                  name="street"
                  className="form-input"
                  value={formData.street}
                  onChange={handleChange}
                  placeholder="123 Main Street"
                  style={{ 
                    padding: '0.75rem',
                    fontSize: '1rem',
                    borderRadius: '8px',
                    border: '2px solid #e5e7eb',
                    transition: 'all 0.3s ease'
                  }}
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
                    className="form-input"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    style={{ 
                      padding: '0.75rem',
                      fontSize: '1rem',
                      borderRadius: '8px',
                      border: '2px solid #e5e7eb',
                      transition: 'all 0.3s ease'
                    }}
                  />
                </div>

                <div className="form-group">
                  <label style={{ fontWeight: 600, color: '#374151', marginBottom: '0.5rem', display: 'block' }}>
                    State / Province
                  </label>
                  <input
                    type="text"
                    name="state"
                    className="form-input"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    style={{ 
                      padding: '0.75rem',
                      fontSize: '1rem',
                      borderRadius: '8px',
                      border: '2px solid #e5e7eb',
                      transition: 'all 0.3s ease'
                    }}
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
                    className="form-input"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="Zip Code"
                    style={{ 
                      padding: '0.75rem',
                      fontSize: '1rem',
                      borderRadius: '8px',
                      border: '2px solid #e5e7eb',
                      transition: 'all 0.3s ease'
                    }}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label style={{ fontWeight: 600, color: '#374151', marginBottom: '0.5rem', display: 'block' }}>
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    className="form-input"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Country"
                    style={{ 
                      padding: '0.75rem',
                      fontSize: '1rem',
                      borderRadius: '8px',
                      border: '2px solid #e5e7eb',
                      transition: 'all 0.3s ease'
                    }}
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={loading} 
              style={{ 
                width: '100%',
                padding: '1rem',
                fontSize: '1.1rem',
                fontWeight: '600',
                borderRadius: '10px',
                background: loading ? '#94a3b8' : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                border: 'none',
                color: 'white',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(79, 172, 254, 0.4)'
              }}
            >
              {loading ? '⏳ Creating your account...' : '✨ Create Account'}
            </button>
          </form>

          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: '#f9fafb',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <p style={{ margin: 0, color: '#6b7280' }}>
              Already have an account?{' '}
              <Link 
                to="/login" 
                style={{ 
                  color: '#4facfe',
                  fontWeight: '600',
                  textDecoration: 'none'
                }}
              >
                Login here →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
