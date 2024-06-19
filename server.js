const express = require('express');
const { google } = require('googleapis');
const path = require('path');

const app = express();
const port = 3000;

// Replace with your actual API key obtained from Google Developers Console
const API_KEY = 'AIzaSyBnSe6WKbUwT1hjRhqvR_9Y6cP-_E1b_V4';

// Create a YouTube Data API client
const youtube = google.youtube({
  version: 'v3',
  auth: API_KEY
});

// Serve static files (HTML, CSS, JS) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle search requests
app.get('/search', async (req, res) => {
  try {
    const query = req.query.q;
    const searchResults = await youtube.search.list({
      part: 'snippet',
      q: query,
      maxResults: 100
    });

    res.json(searchResults.data);
  } catch (err) {
    console.error('Error searching for videos:', err.message);
    res.status(500).json({ error: 'Failed to search for videos' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});