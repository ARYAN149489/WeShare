import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();

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

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '550px', margin: '3rem auto', padding: 0, overflow: 'hidden' }}>
        {/* Gradient Header */}
        <div style={{
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          padding: '2.5rem 2rem',
          textAlign: 'center',
          boxShadow: '0 4px 15px rgba(79, 172, 254, 0.3)'
        }}>
          <h2 style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            🔐 Welcome Back!
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem', margin: 0 }}>
            Sign in to continue to your account
          </p>
        </div>

        <div style={{ padding: '2rem' }}>
          {error && (
            <div style={{
              background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
              border: '2px solid #f87171',
              color: '#991b1b',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              fontSize: '0.95rem',
              fontWeight: '500'
            }}>
              ⚠️ {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            {/* Email Section */}
            <div style={{
              background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
              borderRadius: '8px',
              padding: '1.5rem',
              marginBottom: '1.5rem',
              border: '2px solid #93c5fd'
            }}>
              <h4 style={{ color: '#1e40af', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                📧 Email Address
              </h4>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                required
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  borderRadius: '8px',
                  border: '2px solid #93c5fd',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  backgroundColor: 'white'
                }}
              />
            </div>

            {/* Password Section */}
            <div style={{
              background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
              borderRadius: '8px',
              padding: '1.5rem',
              marginBottom: '2rem',
              border: '2px solid #f9a8d4'
            }}>
              <h4 style={{ color: '#9d174d', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                🔑 Password
              </h4>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  borderRadius: '8px',
                  border: '2px solid #f9a8d4',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  backgroundColor: 'white'
                }}
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={loading}
              style={{ 
                width: '100%',
                background: loading ? '#9ca3af' : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                border: 'none',
                padding: '1rem',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                borderRadius: '8px',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: loading ? 'none' : '0 4px 15px rgba(79, 172, 254, 0.4)',
                color: 'white'
              }}
              onMouseOver={(e) => !loading && (e.target.style.transform = 'translateY(-2px)', e.target.style.boxShadow = '0 6px 20px rgba(79, 172, 254, 0.5)')}
              onMouseOut={(e) => !loading && (e.target.style.transform = 'translateY(0)', e.target.style.boxShadow = '0 4px 15px rgba(79, 172, 254, 0.4)')}
            >
              {loading ? '⏳ Logging in...' : '✅ Login'}
            </button>
          </form>

          <div style={{
            marginTop: '2rem',
            paddingTop: '1.5rem',
            borderTop: '2px solid #e5e7eb',
            textAlign: 'center'
          }}>
            <p style={{ color: '#6b7280', fontSize: '0.95rem', marginBottom: '0.75rem' }}>
              Don't have an account?
            </p>
            <Link 
              to="/register" 
              style={{
                color: '#4facfe',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.color = '#00f2fe'}
              onMouseOut={(e) => e.target.style.color = '#4facfe'}
            >
              Register here →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
