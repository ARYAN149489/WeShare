const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['food', 'clothes', 'blood', 'medicine', 'books', 'electronics', 'furniture', 'other']
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  pickupSchedule: {
    date: Date,
    timeSlot: String,
    type: {
      type: String,
      enum: ['pickup', 'drop'],
      default: 'pickup'
    }
  },
  status: {
    type: String,
    enum: ['available', 'reserved', 'fulfilled', 'expired'],
    default: 'available'
  },
  expiryDate: {
    type: Date
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for geospatial queries
donationSchema.index({ location: '2dsphere' });
donationSchema.index({ category: 1, status: 1 });
donationSchema.index({ donor: 1 });

donationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Donation', donationSchema);
