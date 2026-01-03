const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header (check both x-auth-token and Authorization)
    const token = req.header('x-auth-token') || req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from token
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

const isDonor = (req, res, next) => {
  if (req.user.role !== 'donor') {
    return res.status(403).json({ message: 'Access denied. Donor role required.' });
  }
  next();
};

const isReceiver = (req, res, next) => {
  if (req.user.role !== 'receiver') {
    return res.status(403).json({ message: 'Access denied. Receiver role required.' });
  }
  next();
};

module.exports = { authMiddleware, isDonor, isReceiver };
