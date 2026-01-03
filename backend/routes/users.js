const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const User = require('../models/User');

// @route   GET /api/users/profile
// @desc    Get logged-in user profile
// @access  Private
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { name, phone, address, availability, profileImage, location } = req.body;

    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (address) user.address = address;
    if (typeof availability !== 'undefined') user.availability = availability;
    if (profileImage) user.profileImage = profileImage;
    if (location) user.location = location;

    await user.save();

    const updatedUser = await User.findById(user._id).select('-password');

    res.json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating profile' });
  }
});

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user' });
  }
});

module.exports = router;
