const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const Notification = require('../models/Notification');

// @route   GET /api/notifications
// @desc    Get all notifications for logged-in user
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { unreadOnly } = req.query;
    
    let query = { recipient: req.user._id };
    
    if (unreadOnly === 'true') {
      query.isRead = false;
    }

    const notifications = await Notification.find(query)
      .populate('sender', 'name')
      .populate('relatedDonation', 'title category')
      .sort({ createdAt: -1 })
      .limit(50);

    const unreadCount = await Notification.countDocuments({
      recipient: req.user._id,
      isRead: false
    });

    res.json({ 
      notifications,
      unreadCount 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching notifications' });
  }
});

// @route   PUT /api/notifications/:id/read
// @desc    Mark notification as read
// @access  Private
router.put('/:id/read', authMiddleware, async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    if (notification.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    notification.isRead = true;
    await notification.save();

    res.json({ 
      message: 'Notification marked as read',
      notification 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating notification' });
  }
});

// @route   PUT /api/notifications/read-all
// @desc    Mark all notifications as read
// @access  Private
router.put('/read-all', authMiddleware, async (req, res) => {
  try {
    await Notification.updateMany(
      { recipient: req.user._id, isRead: false },
      { isRead: true }
    );

    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating notifications' });
  }
});

// @route   DELETE /api/notifications/:id
// @desc    Delete notification
// @access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    if (notification.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await notification.deleteOne();

    res.json({ message: 'Notification deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting notification' });
  }
});

module.exports = router;
