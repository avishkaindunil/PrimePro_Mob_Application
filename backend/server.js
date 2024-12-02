const express = require('express');
const app = express();
const routes = require('./routes');
const pool = require('./db'); // Make sure this points to your correct DB connection
const cors = require('cors');

pool.connect()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err));

app.use(cors());

// Middleware
app.use(express.json());
app.use('/api', routes); // All API routes will be prefixed with `/api`

// Root Route
app.get('/', (req, res) => {
  res.send('Backend server is running...');
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
