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

    const result = await pool.query(
      'INSERT INTO users (first_name, last_name, email, mobile, password) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [firstName, lastName, email, mobile, hashedPassword]
    );

    const otp = Math.floor(100000 + Math.random() * 900000);
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

    res.status(200).json({
      message: 'Login successful',
      userId: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      mobile: user.mobile,
    });
  } catch (error) {
    console.error('Detailed Error:', error.message || error);
    res.status(500).json({ error: error.message || 'Failed to log in. Please try again later.' });
  }
});

// Get User Route
router.post('/getUser', async (req, res) => {
  const { email } = req.body;

  try {
    const result = await pool.query('SELECT first_name FROM users WHERE email = $1', [email]);

    if (result.rows.length > 0) {
      res.status(200).json({ firstName: result.rows[0].first_name });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Appointment Booking Route
router.post('/book-appointment', async (req, res) => {
  try {
    console.log("Received request body:", req.body); // Log incoming data
    const { name, mobile, vehicleType, vehicleNumber, serviceType, branch, date, time } = req.body;
    const result = await pool.query(
      'INSERT INTO appointment_bookings (name, mobile, vehicle_type, vehicle_number, service_type, branch, date, time) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
      [name, mobile, vehicleType, vehicleNumber, serviceType, branch, date, time]
    );
    console.log("Appointment booked with ID:", result.rows[0].id); // Log successful insertion
    res.status(201).json({ appointmentId: result.rows[0].id });
  } catch (error) {
    console.error('Error in booking appointment:', error);
    res.status(500).send('<h1>Internal Server Error</h1>'); // Explicit error response
  }
});


// Fetch user details
router.get('/getUserDetails/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      'SELECT first_name, last_name, mobile FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching user details:', error.message || error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// // Booking Route - Create a new booking for a user
// router.post('/book-appointment', async (req, res) => {
//   const { userId, carWashCenterId, appointmentTime } = req.body;

//   try {
//     const result = await pool.query(
//       'INSERT INTO bookings (user_id, car_wash_center_id, appointment_time) VALUES ($1, $2, $3) RETURNING id',
//       [userId, carWashCenterId, appointmentTime]
//     );

//     res.status(201).json({ message: 'Booking created successfully', bookingId: result.rows[0].id });
//   } catch (error) {
//     console.error('Detailed Error:', error.message || error);
//     res.status(500).json({ error: error.message || 'Failed to create booking. Please try again later.' });
//   }
// });

// Fetch all bookings for a user
router.get('/getBookings/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM bookings WHERE user_id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No bookings found for this user' });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching bookings:', error.message || error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get details of a specific booking
router.get('/getBookingDetails/:bookingId', async (req, res) => {
  const { bookingId } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM bookings WHERE id = $1',
      [bookingId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching booking details:', error.message || error);
    res.status(500).json({ error: 'Internal server error' });
  }
}); 


module.exports = router;
