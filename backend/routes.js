const express = require('express');
const pool = require('./db');
const axios = require('axios');
const router = express.Router();
const bcrypt = require('bcryptjs');

let otpStorage = {}; // Temporary storage for OTPs (Replace with Redis/DB in production)

// Register Route
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, mobile, password } = req.body;

  try {
    // Validate mobile number format
    if (!/^\94\d{9}$/.test(mobile)) {
      return res.status(400).json({ error: 'Invalid mobile number format.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Log the hashed password AFTER it has been created
    console.log(firstName, lastName, email, mobile, hashedPassword); // This is now after hashedPassword is initialized

    // Insert the user into the database
    const result = await pool.query(
      'INSERT INTO users (first_name, last_name, email, mobile, password) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [firstName, lastName, email, mobile, hashedPassword] // Save hashed password
    );

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log('Generated OTP:', otp);

    // Save OTP in memory for validation
    otpStorage[mobile] = otp;

    // Send OTP via Notify.lk API
    await axios.post('https://app.notify.lk/api/v1/send', {
      user_id: '28554', // Replace with actual user ID
      api_key: 'y2lNNjF5UTL933W6oqUs', // Replace with actual API key
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

// Login Route (POST /login)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Query the database to find the user by email
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'User not found.' });
    }

    const user = result.rows[0];

    // Compare the password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }

    // Send a response with the user data (or a token if needed)
    res.status(200).json({ message: 'Login successful', userId: user.id, userName: user.first_name });
  } catch (error) {
    console.error('Detailed Error:', error.message || error);
    res.status(500).json({ error: error.message || 'Failed to log in. Please try again later.' });
  }
});


module.exports = router;
