const jwt = require('jsonwebtoken');
const User = require('../models/users'); // Adjust the path to your User model

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).send({ error: 'Not authenticated' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Not authenticated' });
  }
}

// Middleware to check if the user is an admin
function isAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).send({ error: 'Access denied' });
  }
  next();
}

module.exports = { isAuthenticated, isAdmin };