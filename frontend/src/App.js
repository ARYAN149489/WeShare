import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';

// Donor Pages
import DonorDashboard from './pages/Donor/DonorDashboard';
import CreateDonation from './pages/Donor/CreateDonation';
import DonationDetails from './pages/Donor/DonationDetails';
import ManageRequests from './pages/Donor/ManageRequests';
import BrowseDonationRequests from './pages/Donor/BrowseDonationRequests';

// Receiver Pages
import BrowseDonations from './pages/Receiver/BrowseDonations';
import RequestDonation from './pages/Receiver/RequestDonation';
import MyRequests from './pages/Receiver/MyRequests';
import CreateDonationRequest from './pages/Receiver/CreateDonationRequest';

function App() {
  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="App">
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route 
              path="/profile" 
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/notifications" 
              element={
                <PrivateRoute>
                  <Notifications />
                </PrivateRoute>
              } 
            />

            {/* Donor Routes */}
            <Route 
              path="/donor/donations" 
              element={
                <PrivateRoute requiredRole="donor">
                  <DonorDashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/donor/create" 
              element={
                <PrivateRoute requiredRole="donor">
                  <CreateDonation />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/donor/donations/:id" 
              element={
                <PrivateRoute requiredRole="donor">
                  <DonationDetails />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/donor/requests" 
              element={
                <PrivateRoute requiredRole="donor">
                  <ManageRequests />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/donor/browse-requests" 
              element={
                <PrivateRoute requiredRole="donor">
                  <BrowseDonationRequests />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/donor/edit/:id" 
              element={
                <PrivateRoute requiredRole="donor">
                  <CreateDonation />
                </PrivateRoute>
              } 
            />

            {/* Receiver Routes */}
            <Route 
              path="/receiver/browse" 
              element={
                <PrivateRoute requiredRole="receiver">
                  <BrowseDonations />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/receiver/donation/:id" 
              element={
                <PrivateRoute requiredRole="receiver">
                  <RequestDonation />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/receiver/requests" 
              element={
                <PrivateRoute requiredRole="receiver">
                  <MyRequests />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/receiver/create-request" 
              element={
                <PrivateRoute requiredRole="receiver">
                  <CreateDonationRequest />
                </PrivateRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
