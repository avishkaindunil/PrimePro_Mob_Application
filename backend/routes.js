const express = require('express');
const pool = require('./db');
const axios = require('axios');
const router = express.Router();

let otpStorage = {}; // Temporary storage for OTPs (Replace with Redis/DB in production)

// Register Route
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, mobile } = req.body;

  try {
    console.log(firstName, lastName, email, mobile);

    // Validate mobile number format
    if (!/^\94\d{9}$/.test(mobile)) {
      return res.status(400).json({ error: 'Invalid mobile number format.' });
    }

    // Insert the user into the database
    const result = await pool.query(
      'INSERT INTO users (first_name, last_name, email, mobile) VALUES ($1, $2, $3, $4) RETURNING id',
      [firstName, lastName, email, mobile]
    );

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log('Generated OTP:', otp);

    // Save OTP in memory for validation
    otpStorage[mobile] = otp;

    // Send OTP via Notify.lk API
    await axios.post('https://app.notify.lk/api/v1/send', {
      user_id: '28553', // Replace with actual user ID
      api_key: 'a3uHESfhYqlVpTgDKeXc', // Replace with actual API key
      sender_id: 'NotifyDEMO', // Replace with actual sender ID
      to: mobile,
      message: `Your OTP code is ${otp}. Please do not share this code with anyone.`,
    });

    // Send OTP and userId back to frontend
    res.status(201).json({ userId: result.rows[0].id, otp: otp });
  } catch (error) {
    console.error('Detailed Error:', error.message || error); 
    res.status(500).json({ error: error.message || 'Failed to register user or send OTP. Please try again later.' });
  }
});

// OTP Validation Route
router.post('/verify-otp', (req, res) => {
  const { mobile, otp } = req.body;

  if (otpStorage[mobile] && otpStorage[mobile] == otp) {
    delete otpStorage[mobile]; // Remove OTP after successful verification
    return res.status(200).json({ message: 'OTP verified successfully' });
  }
  res.status(400).json({ error: 'Invalid OTP' });
});

module.exports = router;
