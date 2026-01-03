const express = require('express');
const router = express.Router();
const { authMiddleware, isReceiver, isDonor } = require('../middleware/auth');
const Request = require('../models/Request');
const Donation = require('../models/Donation');
const Notification = require('../models/Notification');
const User = require('../models/User');
const { sendEmail, emailTemplates } = require('../utils/emailService');

// @route   POST /api/requests
// @desc    Create a new request
// @access  Private (Receiver only)
router.post('/', authMiddleware, isReceiver, async (req, res) => {
  try {
    const { category, title, description, quantity, urgency, donationId, deliveryAddress } = req.body;

    const request = new Request({
      receiver: req.user._id,
      donation: donationId,
      category,
      title,
      description,
      quantity,
      urgency
    });

    // Add delivery address if provided
    if (deliveryAddress) {
      request.deliveryAddress = deliveryAddress;
    }

    await request.save();

    // If request is for a specific donation, notify the donor
    if (donationId) {
      const donation = await Donation.findById(donationId);
      if (donation) {
        const notification = new Notification({
          recipient: donation.donor,
          sender: req.user._id,
          type: 'request_made',
          title: 'New Request for Your Donation',
          message: `${req.user.name} has requested your donation: "${donation.title}"`,
          relatedDonation: donation._id,
          relatedRequest: request._id
        });
        await notification.save();
      }
    }

    res.status(201).json({
      message: 'Request created successfully',
      request
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating request' });
  }
});

// @route   GET /api/requests/all-open
// @desc    Get all open donation requests (for donors to browse)
// @access  Private
router.get('/all-open', authMiddleware, async (req, res) => {
  try {
    const { category, urgency } = req.query;
    const filter = { donation: null, status: 'pending' }; // Only standalone requests without matched donation

    if (category) {
      filter.category = category;
    }

    if (urgency) {
      filter.urgency = urgency;
    }

    const requests = await Request.find(filter)
      .populate('receiver', 'name email phone')
      .sort({ createdAt: -1 });

    res.json({ requests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching open requests' });
  }
});

// @route   GET /api/requests/my-requests
// @desc    Get requests by logged-in receiver
// @access  Private (Receiver only)
router.get('/my-requests', authMiddleware, isReceiver, async (req, res) => {
  try {
    const requests = await Request.find({ receiver: req.user._id })
      .populate('donation')
      .sort({ createdAt: -1 });

    res.json({ requests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching your requests' });
  }
});

// @route   GET /api/requests/donation/:donationId
// @desc    Get all requests for a specific donation
// @access  Private
router.get('/donation/:donationId', authMiddleware, async (req, res) => {
  try {
    const requests = await Request.find({ 
      donation: req.params.donationId 
    }).populate('receiver', 'name email phone');

    res.json({ requests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching requests' });
  }
});

// @route   GET /api/requests/:id
// @desc    Get single request
// @access  Private
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const request = await Request.findById(req.params.id)
      .populate('receiver', 'name email phone')
      .populate('donation');

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.json({ request });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching request' });
  }
});

// @route   PUT /api/requests/:id
// @desc    Update request
// @access  Private (Receiver only - own requests)
router.put('/:id', authMiddleware, isReceiver, async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if (request.receiver.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this request' });
    }

    const { title, description, quantity, urgency, status } = req.body;

    if (title) request.title = title;
    if (description) request.description = description;
    if (quantity) request.quantity = quantity;
    if (urgency) request.urgency = urgency;
    if (status) request.status = status;

    await request.save();

    res.json({
      message: 'Request updated successfully',
      request
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating request' });
  }
});

// @route   DELETE /api/requests/:id
// @desc    Delete/cancel request
// @access  Private (Receiver only - own requests)
router.delete('/:id', authMiddleware, isReceiver, async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if (request.receiver.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this request' });
    }

    await request.deleteOne();

    res.json({ message: 'Request cancelled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error cancelling request' });
  }
});

// @route   PUT /api/requests/:id/rate
// @desc    Rate a fulfilled donation
// @access  Private (Receiver only)
router.put('/:id/rate', authMiddleware, isReceiver, async (req, res) => {
  try {
    const request = await Request.findById(req.params.id).populate('donation');

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if (request.receiver.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to rate this request' });
    }

    if (request.status !== 'fulfilled') {
      return res.status(400).json({ message: 'Can only rate fulfilled requests' });
    }

    const { rating, feedback } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    request.rating = {
      value: rating,
      feedback: feedback || '',
      ratedAt: new Date()
    };

    await request.save();

    // Notify donor about the rating
    if (request.donation) {
      const donation = await Donation.findById(request.donation._id);
      if (donation) {
        const notification = new Notification({
          recipient: donation.donor,
          sender: req.user._id,
          type: 'rating_received',
          title: 'You Received a Rating',
          message: `${req.user.name} rated your donation "${donation.title}" with ${rating} stars`,
          relatedDonation: donation._id,
          relatedRequest: request._id
        });
        await notification.save();
      }
    }

    res.json({
      message: 'Rating submitted successfully',
      request
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error submitting rating' });
  }
});

// @route   POST /api/requests/:id/fulfill
// @desc    Fulfill a donation request by creating a donation and linking them
// @access  Private (Donor only)
router.post('/:id/fulfill', authMiddleware, isDonor, async (req, res) => {
  try {
    const request = await Request.findById(req.params.id).populate('receiver', 'name email');

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if (request.status !== 'pending') {
      return res.status(400).json({ message: 'This request has already been fulfilled or is no longer available' });
    }

    if (request.donation) {
      return res.status(400).json({ message: 'This request is already linked to a donation' });
    }

    // Get donor's location from their user profile
    const donor = await User.findById(req.user._id);
    
    // Create a new donation based on the request
    const donation = new Donation({
      donor: req.user._id,
      category: request.category,
      title: request.title,
      description: `Donation to fulfill request: ${request.description}`,
      quantity: request.quantity,
      status: 'reserved',
      location: {
        type: 'Point',
        coordinates: donor.location?.coordinates || [76.3869, 30.3398] // Default to Patiala if not set
      },
      address: request.deliveryAddress,
      pickupSchedule: {
        type: 'drop',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        timeSlot: 'To be coordinated'
      },
      receiverId: request.receiver._id
    });

    await donation.save();

    // Update the request to link it to the donation and mark as accepted
    request.donation = donation._id;
    request.status = 'accepted';
    await request.save();

    // Create notification for the receiver
    const notification = new Notification({
      recipient: request.receiver._id,
      sender: req.user._id,
      type: 'request_accepted',
      title: 'Your Request Has Been Approved!',
      message: `${req.user.name} will fulfill your request for "${request.title}"`,
      relatedDonation: donation._id,
      relatedRequest: request._id
    });
    await notification.save();

    // Send email notification to receiver
    try {
      await sendEmail(
        request.receiver.email,
        emailTemplates.requestApproved(
          request.receiver.name,
          request.title,
          req.user.name
        )
      );
    } catch (emailError) {
      console.error('Error sending email:', emailError);
    }

    res.status(201).json({
      message: 'Request fulfilled successfully! Donation created and marked as reserved.',
      donation,
      request
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fulfilling request' });
  }
});

module.exports = router;
