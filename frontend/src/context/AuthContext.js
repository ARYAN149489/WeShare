import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Use environment variable for API URL, fallback to localhost for development
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
      axios.defaults.headers.common['x-auth-token'] = token;
    }
    setLoading(false);
  }, []);  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      axios.defaults.headers.common['x-auth-token'] = token;
      
      setUser(user);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error.response?.data);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };  const register = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      axios.defaults.headers.common['x-auth-token'] = token;
      
      setUser(user);
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error.response?.data);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isDonor: user?.role === 'donor',
    isReceiver: user?.role === 'receiver'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
