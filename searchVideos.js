const { google } = require('googleapis');
const readline = require('readline');

// Replace with your actual API key obtained from Google Developers Console
const API_KEY = 'AIzaSyBnSe6WKbUwT1hjRhqvR_9Y6cP-_E1b_V4';

// Create a YouTube Data API client
const youtube = google.youtube({
  version: 'v3',
  auth: API_KEY
});

// Function to search for YouTube videos
async function searchVideos(query) {
  try {
    const res = await youtube.search.list({
      part: 'snippet',
      q: query,
      maxResults: 10 // Number of results to fetch
    });

    const videos = res.data.items;
    if (videos.length === 0) {
      console.log('No videos found.');
    } else {
      console.log('Search Results:');
      videos.forEach(video => {
        console.log(`Title: ${video.snippet.title}`);
        console.log(`Description: ${video.snippet.description}`);
        console.log('');
      });
    }
  } catch (err) {
    console.error('Error searching for videos:', err.message);
  }
}

// Read search query from command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter search query: ', query => {
  searchVideos(query)
    .then(() => rl.close())
    .catch(err => {
      console.error('Error:', err.message);
      rl.close();
    });
});