const express = require('express');
const router = express.Router();
const { authMiddleware, isDonor } = require('../middleware/auth');
const Donation = require('../models/Donation');
const Notification = require('../models/Notification');
const Request = require('../models/Request');
const User = require('../models/User');
const { sendEmail, emailTemplates } = require('../utils/emailService');

// @route   POST /api/donations
// @desc    Create a new donation listing
// @access  Private (Donor only)
router.post('/', authMiddleware, isDonor, async (req, res) => {
  try {
    const { category, title, description, quantity, images, location, address, pickupSchedule, expiryDate } = req.body;

    const donation = new Donation({
      donor: req.user._id,
      category,
      title,
      description,
      quantity,
      images,
      location,
      address,
      pickupSchedule,
      expiryDate
    });

    await donation.save();
    
    res.status(201).json({
      message: 'Donation created successfully',
      donation
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating donation' });
  }
});

// @route   GET /api/donations
// @desc    Get all donations (with filters)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, status, lat, lng, maxDistance = 50000 } = req.query;
    
    let query = {};
    
    if (category) {
      query.category = category;
    }
    
    if (status) {
      query.status = status;
    } else {
      query.status = 'available';
    }

    let donations;
    
    // If location is provided, search nearby
    if (lat && lng) {
      donations = await Donation.find({
        ...query,
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [parseFloat(lng), parseFloat(lat)]
            },
            $maxDistance: parseInt(maxDistance)
          }
        }
      }).populate('donor', 'name email phone address');
    } else {
      donations = await Donation.find(query)
        .populate('donor', 'name email phone address')
        .sort({ createdAt: -1 });
    }

    res.json({ donations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching donations' });
  }
});

// @route   GET /api/donations/my-donations
// @desc    Get donations by logged-in donor
// @access  Private (Donor only)
router.get('/my-donations', authMiddleware, isDonor, async (req, res) => {
  try {
    const donations = await Donation.find({ donor: req.user._id })
      .populate('receiverId', 'name email phone')
      .sort({ createdAt: -1 });

    res.json({ donations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching your donations' });
  }
});

// @route   GET /api/donations/:id
// @desc    Get single donation
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id)
      .populate('donor', 'name email phone address')
      .populate('receiverId', 'name email phone');

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    res.json({ donation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching donation' });
  }
});

// @route   PUT /api/donations/:id
// @desc    Update donation
// @access  Private (Donor only - own donations)
router.put('/:id', authMiddleware, isDonor, async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    if (donation.donor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this donation' });
    }

    const { category, title, description, quantity, images, location, address, pickupSchedule, expiryDate, status } = req.body;

    if (category) donation.category = category;
    if (title) donation.title = title;
    if (description) donation.description = description;
    if (quantity) donation.quantity = quantity;
    if (images) donation.images = images;
    if (location) donation.location = location;
    if (address) donation.address = address;
    if (pickupSchedule) donation.pickupSchedule = pickupSchedule;
    if (expiryDate) donation.expiryDate = expiryDate;
    if (status) donation.status = status;

    await donation.save();

    res.json({
      message: 'Donation updated successfully',
      donation
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating donation' });
  }
});

// @route   DELETE /api/donations/:id
// @desc    Delete donation
// @access  Private (Donor only - own donations)
router.delete('/:id', authMiddleware, isDonor, async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    if (donation.donor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this donation' });
    }

    await donation.deleteOne();

    res.json({ message: 'Donation deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting donation' });
  }
});

// @route   PUT /api/donations/:id/accept-request/:requestId
// @desc    Accept a request for donation
// @access  Private (Donor only)
router.put('/:id/accept-request/:requestId', authMiddleware, isDonor, async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    const request = await Request.findById(req.params.requestId);

    if (!donation || !request) {
      return res.status(404).json({ message: 'Donation or request not found' });
    }

    if (donation.donor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Update donation
    donation.status = 'reserved';
    donation.receiverId = request.receiver;
    await donation.save();

    // Update request
    request.status = 'accepted';
    request.donation = donation._id;
    await request.save();

    // Create notification for receiver
    const notification = new Notification({
      recipient: request.receiver,
      sender: req.user._id,
      type: 'request_accepted',
      title: 'Request Accepted',
      message: `Your request for "${donation.title}" has been accepted!`,
      relatedDonation: donation._id,
      relatedRequest: request._id
    });
    await notification.save();

    // Send email to receiver
    try {
      const receiver = await User.findById(request.receiver);
      if (receiver) {
        const pickupDetails = {
          type: donation.pickupSchedule?.type || 'pickup',
          date: donation.pickupSchedule?.date || 'TBD',
          time: donation.pickupSchedule?.time || 'TBD',
          address: donation.address ? `${donation.address.street}, ${donation.address.city}, ${donation.address.state}` : 'See donation details'
        };
        await sendEmail(receiver.email, emailTemplates.requestApproved(
          receiver.name,
          req.user.name,
          donation.title,
          pickupDetails
        ));
      }
    } catch (emailError) {
      console.error('Failed to send request approved email:', emailError);
    }

    res.json({
      message: 'Request accepted successfully',
      donation,
      request
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error accepting request' });
  }
});

// @route   PUT /api/donations/:id/mark-fulfilled
// @desc    Mark donation as fulfilled
// @access  Private (Donor only)
router.put('/:id/mark-fulfilled', authMiddleware, isDonor, async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    if (donation.donor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    donation.status = 'fulfilled';
    await donation.save();

    // Update related request
    const request = await Request.findOne({ donation: donation._id, status: 'accepted' });
    if (request) {
      request.status = 'fulfilled';
      await request.save();

      // Notify receiver
      const notification = new Notification({
        recipient: request.receiver,
        sender: req.user._id,
        type: 'donation_fulfilled',
        title: 'Donation Fulfilled',
        message: `The donation "${donation.title}" has been marked as fulfilled. Please rate your experience!`,
        relatedDonation: donation._id,
        relatedRequest: request._id
      });
      await notification.save();

      // Send emails
      try {
        const receiver = await User.findById(request.receiver);
        if (receiver) {
          await sendEmail(receiver.email, emailTemplates.requestFulfilledReceiver(
            receiver.name,
            donation.title,
            req.user.name
          ));
        }
        
        await sendEmail(req.user.email, emailTemplates.donationFulfilledDonor(
          req.user.name,
          donation.title,
          receiver?.name || 'the receiver'
        ));
      } catch (emailError) {
        console.error('Failed to send fulfillment emails:', emailError);
      }
    }

    res.json({
      message: 'Donation marked as fulfilled',
      donation
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error marking donation as fulfilled' });
  }
});

module.exports = router;
