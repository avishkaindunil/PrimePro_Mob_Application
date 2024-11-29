const express = require('express');
const pool = require('./db'); // Import the database connection
const router = express.Router(); // Initialize the router

// Register Route
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, mobile } = req.body;

  try {
    // Insert the user into the database
    const result = await pool.query(
      'INSERT INTO users (first_name, last_name, email, mobile) VALUES ($1, $2, $3, $4) RETURNING id',
      [firstName, lastName, email, mobile]
    );

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000); // Simulate OTP
    console.log('Generated OTP:', otp);

    // Send OTP via Notify.lk API
    const response = await axios.post('https://app.notify.lk/api/v1/send', {
      api_key: '7AniEnHWsZKxoYwfZ2cm', // Your Notify.lk API key
      sender: 'Notify.lk', // Sender name
      to: mobile, // Recipient's mobile number
      message: `Your OTP code is ${otp}`, // OTP message
    });

    // Log Notify.lk response
    console.log('Notify.lk Response:', response.data);

    // Respond with the OTP and user ID
    res.status(201).json({
      userId: result.rows[0].id,
      otp: otp, // Send OTP back for testing purposes
    });

  } catch (error) {
    console.error('Detailed Error:', error); // Log the full error details
    res.status(500).json({ error: 'Error registering user or sending OTP', details: error.message });
  }
});


// OTP Validation Route (optional)
router.post('/verify-otp', (req, res) => {
  const { otp } = req.body;
  // Placeholder for actual OTP validation logic
  res.status(200).json({ message: 'OTP verified successfully' });
});

module.exports = router; // Export the router
