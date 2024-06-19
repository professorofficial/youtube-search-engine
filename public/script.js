// Function to handle search request
async function searchVideos() {
  const searchInput = document.getElementById('searchInput').value.trim(); // Trim to remove leading/trailing spaces

  try {
    const response = await fetch(`/search?q=${encodeURIComponent(searchInput)}`);
    const data = await response.json();
    displaySearchResults(data.items);
  } catch (error) {
    console.error('Error searching for videos:', error);
  }
}

// Event listener for pressing Enter key in search input
document.getElementById('searchInput').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault(); // Prevent default action (form submission)
    searchVideos(); // Call searchVideos function
  }
});

// Function to display search results
function displaySearchResults(videos) {
  const searchResults = document.getElementById('searchResults');
  searchResults.innerHTML = '';

  if (videos.length === 0) {
    searchResults.innerHTML = '<p>No videos found.</p>';
  } else {
    videos.forEach(video => {
      const videoElement = document.createElement('div');
      videoElement.classList.add('video-item');
      videoElement.innerHTML = `
        <h3>${video.snippet.title}</h3>
        <p>${video.snippet.description}</p>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0" allowfullscreen></iframe>
      `;
      searchResults.appendChild(videoElement);
    });
  }
}