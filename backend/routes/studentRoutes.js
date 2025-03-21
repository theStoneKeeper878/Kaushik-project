const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protected Route for Students
router.get('/dashboard', authMiddleware, (req, res) => {
  if (req.user.role !== 'student') {
    return res.status(403).json({ message: 'Access denied' });
  }
  res.json({ message: 'Welcome to the Student Dashboard' });
});

module.exports = router;
