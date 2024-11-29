const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes'); // Import routes

app.use(cors());
app.use(express.json()); // Middleware to parse JSON
app.use('/api', routes); // Mount routes at /api

// Root Route
app.get('/', (req, res) => {
  res.send('Backend server is running...');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
