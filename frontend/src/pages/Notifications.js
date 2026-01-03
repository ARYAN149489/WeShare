import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { notificationAPI } from '../services/api';

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await notificationAPI.getAll();
      setNotifications(response.data.notifications);
      setUnreadCount(response.data.unreadCount);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await notificationAPI.markAsRead(id);
      fetchNotifications();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationAPI.markAllAsRead();
      fetchNotifications();
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await notificationAPI.delete(id);
      fetchNotifications();
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const handleNotificationClick = (notification) => {
    if (notification.relatedDonation) {
      navigate('/donor/requests');
    } else if (notification.relatedRequest) {
      navigate('/receiver/my-requests');
    }
  };

  if (loading) {
    return <div className="loading">Loading notifications...</div>;
  }

  return (
    <div className="container">
      <div className="flex-between mb-4">
        <h1>Notifications {unreadCount > 0 && `(${unreadCount} unread)`}</h1>
        {unreadCount > 0 && (
          <button onClick={handleMarkAllAsRead} className="btn btn-secondary">
            Mark All as Read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="empty-state">
          <h3 className="empty-state-title">No notifications</h3>
          <p>You're all caught up!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1">
          {notifications.map((notification) => (
            <div 
              key={notification._id} 
              className="card"
              style={{
                backgroundColor: notification.isRead ? 'white' : '#eff6ff',
                borderLeft: notification.isRead ? 'none' : '4px solid #2563eb',
                cursor: (notification.relatedDonation || notification.relatedRequest) ? 'pointer' : 'default'
              }}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="flex-between">
                <div style={{ flex: 1 }}>
                  <div className="flex gap-2" style={{ alignItems: 'center', marginBottom: '0.5rem' }}>
                    <h3>{notification.title}</h3>
                    {!notification.isRead && (
                      <span className="badge" style={{ backgroundColor: '#2563eb', color: 'white' }}>
                        New
                      </span>
                    )}
                  </div>
                  
                  <p style={{ color: '#4b5563', marginBottom: '0.5rem' }}>
                    {notification.message}
                  </p>
                  
                  {notification.sender && (
                    <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      From: {notification.sender.name}
                    </p>
                  )}
                  
                  <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                  
                  {(notification.relatedDonation || notification.relatedRequest) && (
                    <p style={{ fontSize: '0.875rem', color: '#2563eb', marginTop: '0.5rem' }}>
                      Click to manage →
                    </p>
                  )}
                </div>
                
                <div className="flex gap-2" style={{ flexDirection: 'column' }}>
                  {!notification.isRead && (
                    <button 
                      onClick={() => handleMarkAsRead(notification._id)}
                      className="btn btn-primary"
                    >
                      Mark as Read
                    </button>
                  )}
                  <button 
                    onClick={() => handleDelete(notification._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
