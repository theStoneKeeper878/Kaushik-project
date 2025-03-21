const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protected Route for Teachers
router.get('/dashboard', authMiddleware, (req, res) => {
  if (req.user.role !== 'teacher') {
    return res.status(403).json({ message: 'Access denied' });
  }
  res.json({ message: 'Welcome to the Teacher Dashboard' });
});

module.exports = router;
