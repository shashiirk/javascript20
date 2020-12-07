const searchInput = document.getElementById('search-input');
const form = document.getElementById('form');
const noResult = document.getElementById('no-result');
const items = document.getElementById('items');
const recipeBackdrop = document.getElementById('recipe-backdrop');
const recipe = document.getElementById('recipe');
const crossIcon = document.getElementById('cross-icon');
// Stores recipe details in an array
const recipeItems = [];

// Close the recipe panel
function closeRecipe() {
  recipeBackdrop.classList.remove('visible');
  document.body.classList.remove('no-scroll');
}

// Converts a sentence to title case
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

// Render complete recipe details
function renderRecipe(targetItemID) {
  const recipeItem = recipeItems.find((value) => {
    return value.idMeal === targetItemID;
  });

  const ul = document.createElement('ul');
  ul.classList.add('recipe-ingredients');

  // Combine recipe ingredients and their measurements as a string
  for (let i = 1; i <= 20; i++) {
    if (recipeItem[`strIngredient${i}`]) {
      const li = document.createElement('li');
      li.classList.add('recipe-ingredient');
      const text = `${toTitleCase(recipeItem[`strIngredient${i}`])} - ${
        recipeItem[`strMeasure${i}`]
      }`;
      li.textContent = text;
      ul.append(li);
    } else {
      break;
    }
  }

  // Add backdrop
  recipeBackdrop.classList.add('visible');

  // Avoid background scrolling when recipe panel is displayed
  document.body.classList.add('no-scroll');

  recipe.innerHTML = `
    <h1 class="recipe-title">${recipeItem.strMeal}</h1>
    <img class="recipe-img" src="${recipeItem.strMealThumb}" alt="">
    <a class="recipe-video-btn" href="${recipeItem.strYoutube}" target="_blank">Watch video</a>
    <h2 class="recipe-instructions-title">Instructions</h2>
    <p class="recipe-instructions-content">${recipeItem.strInstructions}</p>
    <h2 class="recipe-ingredients-title">Ingredients</h2>
  `;
  recipe.append(crossIcon, ul);
}

// Configuration made to render a recipe when clicked on the recipe item
function configureRenderRecipe(ev) {
  // Performing event delegation
  const targetItem = ev.path.find((value) => {
    if (value.classList) {
      return value.classList.contains('item');
    } else {
      return false;
    }
  });

  // Checks if the user clicked on actual item
  if (targetItem) {
    const targetItemID = targetItem.dataset.itemId;
    renderRecipe(targetItemID);
  }
}

// Resets some variables and properties to their defaults
function reset() {
  recipeItems.splice(0);
  noResult.classList.remove('visible');
  items.innerHTML = '';
}

// Search recipe and fetch the details from themealdb API
function searchRecipeHandler(ev) {
  ev.preventDefault();

  reset();
  const searchTerm = searchInput.value.trim();

  if (searchTerm) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        // Checks if any meals found with the searchTerm
        if (data.meals) {
          data.meals.forEach((value) => {
            recipeItems.push(value);
            const item = document.createElement('div');
            item.classList.add('item');
            item.setAttribute('data-item-id', value.idMeal);
            item.innerHTML = `
              <img class="item-img" src="${value.strMealThumb}" alt="image">
              <div class="item-content">
                <h3 class="item-title">${value.strMeal}</h3>
                <p class="item-region">${value.strArea}</p>
              </div>
            `;
            items.append(item);
          });
        } else {
          noResult.textContent = `No results found for "${searchTerm}"`;
          noResult.classList.add('visible');
        }
      });
  } else {
    noResult.textContent = `No results found`;
    noResult.classList.add('visible');
  }
}

// Event Listeners
form.addEventListener('submit', searchRecipeHandler);
items.addEventListener('click', configureRenderRecipe);
crossIcon.addEventListener('click', closeRecipe);
