const express = require('express');
const pool = require('./db'); // Import the database connection
const router = express.Router(); // Initialize the router

// Register Route
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, mobile } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users (first_name, last_name, email, mobile) VALUES ($1, $2, $3, $4) RETURNING id',
      [firstName, lastName, email, mobile]
    );
    const otp = Math.floor(100000 + Math.random() * 900000); // Simulate OTP
    console.log('Generated OTP:', otp);
    res.status(201).json({ userId: result.rows[0].id, otp });
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(500).json({ error: 'Error registering user' });
  }
});

// OTP Validation Route (optional)
router.post('/verify-otp', (req, res) => {
  const { otp } = req.body;
  // Placeholder for actual OTP validation logic
  res.status(200).json({ message: 'OTP verified successfully' });
});

module.exports = router; // Export the router
