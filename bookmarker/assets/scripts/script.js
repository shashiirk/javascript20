const addBookmarkBtn = document.querySelector('.add-bookmark-btn');
const bookmarks = document.querySelector('.bookmarks');
const addBookmarkContainer = document.querySelector('.add-bookmark-container');
const form = document.querySelector('.form');
const websiteName = document.getElementById('website-name');
const websiteUrl = document.getElementById('website-url');
let websiteNameValue;
let websiteUrlValue;
// Array to store bookmarks
let bookmarksList = [];

// Fetch bookmark items from localStorage and add to document
function fetchFromLocalStorage() {
  const bookmarkItems = localStorage.getItem('bookmarks');
  if (bookmarkItems !== null) {
    bookmarksList = JSON.parse(bookmarkItems);
    // Add items to document
    updateBookmarks();
  }
}

// Clear the form fields
function clearForm() {
  // Clear input fields
  form.reset();

  // Remove error selections
  websiteName.parentElement.classList.remove('error');
  websiteUrl.parentElement.classList.remove('error');
}

// Show the form
function showForm() {
  addBookmarkContainer.classList.add('show');
  // Make body unscrollable when form is shown
  document.body.classList.add('no-scroll');
}

// Hide the form
function hideForm(ev) {
  if (
    ev === undefined ||
    ev.target.classList.contains('add-bookmark-container')
  ) {
    clearForm();
    addBookmarkContainer.classList.remove('show');
    // Make body scrollable when form is hidden
    document.body.classList.remove('no-scroll');
  }
}

// Generate a unique ID
function generateId() {
  let randomId = Math.floor(Math.random() * 1000000);
  let nos = bookmarksList.map((value) => value.id);

  // Ensure that the randomId is not used before
  while (nos.includes(randomId)) {
    randomId = Math.floor(Math.random() * 1000000);
  }

  return randomId;
}

// Add bookmark items picked from localStorage to the document
function updateBookmarks() {
  bookmarksList.forEach((value) => {
    // Create a new div for bookmark to add it to the document
    const bookmark = document.createElement('div');
    bookmark.classList.add('bookmark');
    bookmark.setAttribute('data-index', value.id);
    // Set its innerHTML
    bookmark.innerHTML = `
    <img src="https://s2.googleusercontent.com/s2/favicons?domain=${value.url}" alt="favicon" class="head" />
    <p class="body">${value.title}</p>
    <div class="tail">
      <a href="${value.url}" target="_blank"><i class="link fas fa-external-link-alt"></i></a>
      <i class="trash fas fa-trash-alt" onclick="deleteBookmark(${value.id})"></i>
    </div>
  `;
    // Append to the bookmarks
    bookmarks.append(bookmark);
  });
}

// Store bookmark items in the localStorage
function updateLocalStorage() {
  if (bookmarksList.length !== 0) {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarksList));
  } else {
    localStorage.clear();
  }
}

// Store the bookmark in bookmarkList, localStorage and add to document
function storeBookmark() {
  // Create a bookmark item and add it to bookmarkList
  const newBookmark = {
    id: generateId(),
    title: websiteNameValue,
    url: websiteUrlValue,
  };
  bookmarksList.push(newBookmark);

  // Update the localStorage
  updateLocalStorage();

  // Create a new div for bookmark to add it to the document
  const bookmark = document.createElement('div');
  bookmark.classList.add('bookmark');
  bookmark.setAttribute('data-index', newBookmark.id);
  // Set its innerHTML
  bookmark.innerHTML = `
    <img src="https://s2.googleusercontent.com/s2/favicons?domain=${websiteUrlValue}" alt="favicon" class="head" />
    <p class="body">${websiteNameValue}</p>
    <div class="tail">
      <a href="${websiteUrlValue}" target="_blank"><i class="link fas fa-external-link-alt"></i></a>
      <i class="trash fas fa-trash-alt" onclick="deleteBookmark(${newBookmark.id})"></i>
    </div>
  `;
  // Append to the bookmarks
  bookmarks.append(bookmark);
}

// Delete the bookmark
function deleteBookmark(bookmarkId) {
  bookmarksList = bookmarksList.filter((value) => value.id !== bookmarkId);
  const bookmarkItem = document.querySelector(`[data-index='${bookmarkId}']`);
  // Delete item from document
  bookmarkItem.remove();
  // Update the localStorage
  updateLocalStorage();
}

// Validate form
function validateForm() {
  websiteNameValue = websiteName.value.trim();
  websiteUrlValue = websiteUrl.value.trim().toLowerCase();
  // Add 'https://' if not mentioned
  if (
    !websiteUrlValue.includes('https://') &&
    !websiteUrlValue.includes('http://')
  ) {
    websiteUrlValue = `https://${websiteUrlValue}`;
  }
  // Regex pattern to validate url
  const pattern = /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;

  if (!websiteNameValue || !websiteUrlValue.match(pattern)) {
    if (!websiteNameValue) {
      websiteName.parentElement.classList.add('error');
    } else {
      websiteName.parentElement.classList.remove('error');
    }

    if (!websiteUrlValue.match(pattern)) {
      websiteUrl.parentElement.classList.add('error');
    } else {
      websiteUrl.parentElement.classList.remove('error');
    }

    return false;
  } else {
    websiteName.parentElement.classList.remove('error');
    websiteUrl.parentElement.classList.remove('error');
    return true;
  }
}

// Validate form and add new bookmark
function submitEntry(ev) {
  // Prevent the default behaviour on form submit
  ev.preventDefault();

  const isValid = validateForm();
  // If form is validated successfully
  if (isValid) {
    // Store the bookmark
    storeBookmark();

    // Hide the form
    hideForm();
  }
}

// On load
fetchFromLocalStorage();

// Listen to click event on addBookmarkBtn
addBookmarkBtn.addEventListener('click', showForm);
// Listen to submit event on form
form.addEventListener('submit', submitEntry);
// Listen to click event on addBookmarkContainer
addBookmarkContainer.addEventListener('click', hideForm);
