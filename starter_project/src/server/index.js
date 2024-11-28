const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const { menaCloud } = require('./menaCloud');

// Initialize environment variables from .env file
dotenv.config();

// Setup Express App
const app = express();
const port = process.env.PORT || 8000;  // Use environment variable for port if available

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// POST Route to handle URL processing
app.post('/getData', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ msg: 'URL is required', code: 400 });
    }

    // Fetch data from menaCloud API
    const menaCloudResult = await menaCloud(url, process.env.API_KEY);
    const { object, msg, code } = menaCloudResult;

    // Handle API response
    if (code === 212 || code === 100) {
      return res.status(400).json({ object: null, msg, code });
    }

    return res.status(200).json({ object, msg, code });

  } catch (error) {
    console.error('Error in /getData route:', error);
    return res.status(500).json({ msg: 'Internal Server Error', code: 500 });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
