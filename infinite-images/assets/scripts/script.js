const images = document.getElementById('images');
const loader = document.getElementById('loader');
// No.of images per page
const limitValue = 5;
// Current Page Number
let pageValue = 0;
// Scrolled to bottom before or not
let scrolledToBottomBefore = false;

// Fetch images from picsum API
async function getImages() {
  try {
    const response = await fetch(
      `https://picsum.photos/v2/list?limit=${limitValue}&page=${++pageValue}`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

// Add images to DOM and display them
async function displayImages() {
  try {
    const imagesData = await getImages();

    // Create an image element for each image in imagesData
    imagesData.forEach((image) => {
      // Wrap 'img' with 'a' tag to redirect to a target url when the image is clicked
      const imageEl = document.createElement('a');
      imageEl.classList.add('image-link');
      imageEl.setAttribute('href', image.url);
      imageEl.setAttribute('target', '_blank');
      imageEl.innerHTML = `
        <img src=${image.download_url} alt='image' class='image'>
      `;
      // Append to images
      images.append(imageEl);
    });
  } catch (error) {
    console.log(error);
  }
}

// Display css loader animation
function displayLoader() {
  loader.classList.add('visible');

  // Remove loader after certain amount of time and display next page images
  setTimeout(() => {
    loader.classList.remove('visible');
    displayImages();
    scrolledToBottomBefore = false;
  }, 2000);
}

// Display loader and fetch next page of images when scrolled to bottom
function scrollHandler() {
  // Check whether user scrolled to bottom of the window
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1 &&
    !scrolledToBottomBefore
  ) {
    scrolledToBottomBefore = true;
    displayLoader();
  }
}

// Load images initially
displayImages();

// Listen to scroll event
window.addEventListener('scroll', scrollHandler);
