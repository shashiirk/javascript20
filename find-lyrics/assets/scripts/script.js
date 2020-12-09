const form = document.getElementById('form');
const searchInput = document.getElementById('search-input');
const noResult = document.getElementById('no-result');
const items = document.getElementById('items');
const more = document.getElementById('more');
const message = document.getElementById('message');
const loader = document.getElementById('loader');
const lyricsBackdrop = document.getElementById('lyrics-backdrop');
const lyrics = document.getElementById('lyrics');
const crossIcon = document.getElementById('cross-icon');
// Stores next page URL for each page
const fetchedResults = [];

// Resets some variables and properties to their defaults
function reset() {
  noResult.classList.remove('visible');
  items.innerHTML = '';
  more.classList.remove('visible');
  message.classList.remove('visible');
  loader.classList.remove('visible');
  fetchedResults.splice(0);
}

// Close the lyrics panel
function closeLyrics() {
  lyricsBackdrop.classList.remove('visible');
  document.body.classList.remove('no-scroll');
}

// Get the lyrics for the song item clicked
async function getLyrics(ev) {
  try {
    // Perform event delegation
    const targetItem = ev.path.find((value) => {
      if (value.classList) {
        return value.classList.contains('item');
      } else {
        return false;
      }
    });

    // Target item properties
    const title = targetItem.dataset.title;
    const artist = targetItem.dataset.artist;

    const api_url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    const response = await fetch(api_url);
    const result = await response.json();
    // Replacing carriage return and newline characters with html line break
    const lyricsContent = result.lyrics.replace(/[\r\n]/g, '<br>');

    // Add backdrop
    lyricsBackdrop.classList.add('visible');

    // Avoid background scrolling when lyrics panel is displayed
    document.body.classList.add('no-scroll');

    lyrics.innerHTML = `
      <h2 class="lyrics-title">${title}</h1>
      <h3 class="lyrics-artist">${artist}</h3>
      <p class="lyrics-content">${lyricsContent}</p>
    `;

    // Appending cross icon
    lyrics.append(crossIcon);
  } catch (error) {
    console.log(error);
  }
}

// Call back function for click event on load more button
function getSongsHandler() {
  // Copies last item in fetchedResults
  const nextURL = fetchedResults[fetchedResults.length - 1];
  getSongs(nextURL, true);
}

// Add new event listener and remove the previous one for load more button
function changeEventListener() {
  more.removeEventListener('click', getSongsHandler);
  more.addEventListener('click', getSongsHandler);
}

// Get songs from external API and add to DOM
async function getSongs(searchTerm, isURL = false) {
  try {
    let api_url;

    if (isURL) {
      api_url = `https://cors-anywhere.herokuapp.com/${searchTerm}`;
      message.classList.remove('visible');
      loader.classList.add('visible');
    } else {
      api_url = `https://api.lyrics.ovh/suggest/${searchTerm}`;
    }

    const response = await fetch(api_url);
    const result = await response.json();

    if (result.data.length > 0) {
      // Create a song item for each value in result.data
      result.data.forEach((value) => {
        const item = document.createElement('div');
        item.classList.add('item');
        item.setAttribute('data-title', value.title);
        item.setAttribute('data-artist', value.artist.name);
        item.innerHTML = `
          <h3 class="item-title">${value.title}</h3>
          <p class="item-artist">${value.artist.name}</p>
        `;
        items.append(item);
      });

      loader.classList.remove('visible');
      message.classList.add('visible');

      // Checks if the results contain next page
      if (result.next) {
        fetchedResults.push(result.next);
        more.classList.add('visible');
        changeEventListener();
      } else {
        more.classList.remove('visible');
      }
    } else {
      noResult.textContent = `No results found for "${searchTerm}"`;
      noResult.classList.add('visible');
    }
  } catch (error) {
    throw error;
  }
}

// Get the search term and search for songs conditionally
function searchHandler(ev) {
  try {
    // Prevent the default behaviour of form submit
    ev.preventDefault();

    reset();
    const searchTerm = searchInput.value.trim();
    // Checks whether searchTerm is empty
    if (searchTerm) {
      getSongs(searchTerm);
    } else {
      noResult.textContent = `No results found`;
      noResult.classList.add('visible');
    }
  } catch (error) {
    console.log(error);
  }
}

// Event listeners
form.addEventListener('submit', searchHandler);
items.addEventListener('click', getLyrics);
crossIcon.addEventListener('click', closeLyrics);
