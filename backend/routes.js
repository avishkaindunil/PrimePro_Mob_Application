const express = require('express');
const pool = require('./db');
const axios = require('axios');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Move OTP storage to memory for now
let otpStorage = {};

// Register Route
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, mobile, password } = req.body;

  try {
    if (!/^\94\d{9}$/.test(mobile)) {
      return res.status(400).json({ error: 'Invalid mobile number format.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(firstName, lastName, email, mobile, hashedPassword);

    const result = await pool.query(
      'INSERT INTO users (first_name, last_name, email, mobile, password) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [firstName, lastName, email, mobile, hashedPassword]
    );

    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log('Generated OTP:', otp);

    otpStorage[mobile] = otp;

    await axios.post('https://app.notify.lk/api/v1/send', {
      user_id: '28567',
      api_key: '1QCFM2e31zzhbM2qGLuA',
      sender_id: 'NotifyDEMO',
      to: mobile,
      message: `Your OTP code is ${otp}. Please do not share this code with anyone.`,
    });

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
    delete otpStorage[mobile];
    return res.status(200).json({ message: 'OTP verified successfully' });
  }
  res.status(400).json({ error: 'Invalid OTP' });
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'User not found.' });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }

    res.status(200).json({ message: 'Login successful', userId: user.id, userName: user.first_name });
  } catch (error) {
    console.error('Detailed Error:', error.message || error);
    res.status(500).json({ error: error.message || 'Failed to log in. Please try again later.' });
  }
});

// Fetch user data by email
router.post('/getUser', async (req, res) => {
  const { email } = req.body;
  try {
    const result = await pool.query('SELECT first_name FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ firstName: result.rows[0].first_name });
  } catch (error) {
    console.error('Error fetching user:', error.message || error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
