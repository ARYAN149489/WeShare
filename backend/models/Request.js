const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  donation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donation'
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
  urgency: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'fulfilled', 'rejected', 'cancelled'],
    default: 'pending'
  },
  rating: {
    value: {
      type: Number,
      min: 1,
      max: 5
    },
    feedback: String,
    ratedAt: Date
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

requestSchema.index({ receiver: 1, status: 1 });
requestSchema.index({ donation: 1 });

requestSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Request', requestSchema);
