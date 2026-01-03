import axios from 'axios';

// Use environment variable for API URL, fallback to localhost for development
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Donations
export const donationAPI = {
  getAll: (params) => api.get('/donations', { params }),
  getById: (id) => api.get(`/donations/${id}`),
  getMyDonations: () => api.get('/donations/my-donations'),
  create: (data) => api.post('/donations', data),
  update: (id, data) => api.put(`/donations/${id}`, data),
  delete: (id) => api.delete(`/donations/${id}`),
  acceptRequest: (donationId, requestId) => api.put(`/donations/${donationId}/accept-request/${requestId}`),
  markFulfilled: (id) => api.put(`/donations/${id}/mark-fulfilled`)
};

// Requests
export const requestAPI = {
  getMyRequests: () => api.get('/requests/my-requests'),
  getById: (id) => api.get(`/requests/${id}`),
  getByDonation: (donationId) => api.get(`/requests/donation/${donationId}`),
  create: (data) => api.post('/requests', data),
  update: (id, data) => api.put(`/requests/${id}`, data),
  delete: (id) => api.delete(`/requests/${id}`),
  rate: (id, rating, feedback) => api.put(`/requests/${id}/rate`, { rating, feedback })
};

// Notifications
export const notificationAPI = {
  getAll: (unreadOnly = false) => api.get('/notifications', { params: { unreadOnly } }),
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
  markAllAsRead: () => api.put('/notifications/read-all'),
  delete: (id) => api.delete(`/notifications/${id}`)
};

// Users
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  getById: (id) => api.get(`/users/${id}`)
};

export default api;
