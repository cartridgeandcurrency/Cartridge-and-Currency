// ============================================================
// YOUTUBE.JS - YOUTUBE DATA API INTEGRATION
// Fetches the 6 most recent videos from your YouTube channel
// and displays them as embedded players on the videos page
// and homepage.
// ============================================================

// --- CONFIGURATION ---
// Your YouTube API key and channel ID from _config.yml
// NOTE: The API key is visible in the source code on a static site.
// To protect it, restrict the key to your domain only in Google Cloud Console:
// Google Cloud Console > Credentials > API Key > Application restrictions > HTTP referrer
const YOUTUBE_API_KEY = 'AIzaSyBR9d_Dat3mcsRG6zWeD_Ho-49nJaqPQyY';
const CHANNEL_ID = 'UCHwUFNyln995EU3CG54Apkw';
const MAX_RESULTS = 6;  // Number of videos to show

// --- FETCH VIDEOS FROM YOUTUBE API ---
// This function calls the YouTube Data API v3 Search endpoint
// Documentation: https://developers.google.com/youtube/v3/docs/search/list
async function fetchYouTubeVideos() {
  // Build the API request URL
  // Parameters:
  //   part=snippet  - Get video metadata (title, thumbnail, description)
  //   channelId=    - Your channel ID (from _config.yml)
  //   maxResults=   - Limit to 6 videos
  //   order=date    - Sort by newest first
  //   type=video    - Only return videos (not playlists or channels)
  const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=${MAX_RESULTS}&order=date&type=video&key=${YOUTUBE_API_KEY}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Check for API errors
    if (data.error) {
      console.error('YouTube API Error:', data.error.message);
      showError();
      return [];
    }

    return data.items || [];
  } catch (error) {
    console.error('Failed to fetch YouTube videos:', error);
    showError();
    return [];
  }
}

// --- RENDER VIDEOS ON THE VIDEOS PAGE ---
// Creates YouTube iframe embeds for each video
async function loadVideoPage() {
  const videoGrid = document.getElementById('video-grid');

  // Only run if we're on the videos page
  if (!videoGrid) return;

  const videos = await fetchYouTubeVideos();

  if (videos.length === 0) {
    // showError() was already called in fetchYouTubeVideos
    return;
  }

  // Build HTML for each video
  videoGrid.innerHTML = videos.map(video => `
    <div class="video-card">
      <!-- iframe embeds the video player directly on the page -->
      <!-- The video ID from the API response is used to build the embed URL -->
      <iframe
        src="https://www.youtube.com/embed/${video.id.videoId}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>
      <h3 class="video-card-title">${video.snippet.title}</h3>
      <p style="font-size:16px;color:#404040;">${formatVideoDate(video.snippet.publishedAt)}</p>
    </div>
  `).join('');
}

// --- RENDER VIDEO PREVIEWS ON HOMEPAGE ---
// Shows 3 recent videos as thumbnails (lighter than full embeds)
async function loadHomeVideos() {
  const homeGrid = document.getElementById('home-video-grid');

  // Only run if we're on the homepage
  if (!homeGrid) return;

  const videos = await fetchYouTubeVideos();

  if (videos.length === 0) {
    homeGrid.innerHTML = '<p>Videos unavailable. <a href="https://www.youtube.com/@CartridgeandCurrency">Visit our channel</a>.</p>';
    return;
  }

  // Show only 3 on homepage
  const homeVideos = videos.slice(0, 3);

  homeGrid.innerHTML = homeVideos.map(video => `
    <div class="video-card">
      <a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank">
        <img src="${video.snippet.thumbnails.medium.url}"
             alt="${video.snippet.title}"
             style="width:100%;border:1px solid #000;">
      </a>
      <h3 class="video-card-title">${video.snippet.title}</h3>
    </div>
  `).join('');
}

// --- SHOW ERROR MESSAGE ---
// Displays the error box if the API fails
function showError() {
  const errorDiv = document.getElementById('video-error');
  const videoGrid = document.getElementById('video-grid');

  if (errorDiv) errorDiv.style.display = 'block';
  if (videoGrid) videoGrid.innerHTML = '';
}

// --- FORMAT VIDEO DATE ---
// Converts ISO date "2026-07-11T12:00:00Z" to "Jul 11, 2026"
function formatVideoDate(isoDate) {
  const date = new Date(isoDate);
  const months = ['Jan','Feb','Mar','Apr','May','Jun',
                   'Jul','Aug','Sep','Oct','Nov','Dec'];
  return months[date.getMonth()] + ' ' +
         date.getDate() + ', ' +
         date.getFullYear();
}

// --- PAGE INITIALIZATION ---
// Load videos when the page is ready
document.addEventListener('DOMContentLoaded', function() {
  loadVideoPage();    // Renders on /videos/ page
  loadHomeVideos();   // Renders on homepage
});
