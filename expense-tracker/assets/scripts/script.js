const balanceAmtEl = document.getElementById('balance-amt');
let balanceAmt = 0;
const incomeAmtEl = document.getElementById('income-amt');
let incomeAmt = 0;
const expenseAmtEl = document.getElementById('expense-amt');
let expenseAmt = 0;
const dashboard = document.querySelector('.dashboard');
const dbMenu = document.querySelector('.db-menu');
const incomeMenu = document.querySelector('.db-income-title');
const expenseMenu = document.querySelector('.db-expense-title');
const allMenu = document.querySelector('.db-all-title');
const incomeItems = document.querySelector('.db-income-items');
const expenseItems = document.querySelector('.db-expense-items');
const allItems = document.querySelector('.db-all-items');
const incomeForm = document.getElementById('db-income-form');
const expenseForm = document.getElementById('db-expense-form');
const greenColor = 'rgb(20, 136, 20)';
const redColor = 'rgb(236, 34, 34)';

// Fetch items from localStorage if available and add them to the document
function fetchFromLocalStorage() {
  // Fetch Income items
  const localIncomeItems =
    localStorage.getItem('income') !== null
      ? JSON.parse(localStorage.getItem('income'))
      : {};
  // If there are any items in localItems
  if (localIncomeItems.length !== 0) {
    for (let key in localIncomeItems) {
      // Create a new item
      const li = document.createElement('li');
      li.classList.add('db-item');
      li.innerHTML = `
      <p>${key} : <i class="rupee fas fa-rupee-sign"></i
      > ${localIncomeItems[key]}</p>
      <div class="icons">
        <i class="edit fas fa-edit"></i>
        <i class="delete fas fa-trash-alt"></i>
      </div>
      `;
      incomeItems.append(li);
      // Update incomeAmt
      incomeAmt += localIncomeItems[key];
    }
  }

  // Fetch Expense items
  const localExpenseItems =
    localStorage.getItem('expense') !== null
      ? JSON.parse(localStorage.getItem('expense'))
      : {};
  // If there are any items in localExpenseItems
  if (localExpenseItems.length !== 0) {
    for (let key in localExpenseItems) {
      // Create a new item
      const li = document.createElement('li');
      li.classList.add('db-item');
      li.innerHTML = `
      <p>${key} : <i class="rupee fas fa-rupee-sign"></i
      > ${localExpenseItems[key]}</p>
      <div class="icons">
        <i class="edit fas fa-edit"></i>
        <i class="delete fas fa-trash-alt"></i>
      </div>
      `;
      expenseItems.append(li);
      // Update expenseAmt
      expenseAmt += localExpenseItems[key];
    }
  }

  // Update amounts in the document
  updateAmounts();

  // Update items in All section
  updateAllItems();
}

// Make the clicked menu item active and others inactive
function toggleMenuItems(ev) {
  // Clear form error correction on menu page transition
  const incomeTitle = incomeForm.querySelector('.input-title');
  const incomeAmount = incomeForm.querySelector('.input-amount');
  incomeTitle.value = '';
  incomeTitle.parentElement.classList.remove('error');
  incomeAmount.value = '';
  incomeAmount.parentElement.classList.remove('error');

  const expenseTitle = expenseForm.querySelector('.input-title');
  const expenseAmount = expenseForm.querySelector('.input-amount');
  expenseTitle.value = '';
  expenseTitle.parentElement.classList.remove('error');
  expenseAmount.value = '';
  expenseAmount.parentElement.classList.remove('error');

  const targetElement = ev.target;

  // Check whether targetElement is an actual menu item
  if (targetElement.classList.contains('db-income-title')) {
    // Activate incomeMenu
    incomeMenu.classList.add('show');
    expenseMenu.classList.remove('show');
    allMenu.classList.remove('show');

    // Activate incomeItems
    incomeItems.parentElement.classList.add('show');
    expenseItems.parentElement.classList.remove('show');
    allItems.parentElement.classList.remove('show');
  } else if (targetElement.classList.contains('db-expense-title')) {
    // Activate expenseMenu
    expenseMenu.classList.add('show');
    incomeMenu.classList.remove('show');
    allMenu.classList.remove('show');

    // Activate expenseItems
    expenseItems.parentElement.classList.add('show');
    incomeItems.parentElement.classList.remove('show');
    allItems.parentElement.classList.remove('show');
  } else if (targetElement.classList.contains('db-all-title')) {
    // Activate allMenu
    allMenu.classList.add('show');
    incomeMenu.classList.remove('show');
    expenseMenu.classList.remove('show');

    // Activate allItems
    allItems.parentElement.classList.add('show');
    incomeItems.parentElement.classList.remove('show');
    expenseItems.parentElement.classList.remove('show');
  }
}

// Copy items in Income and Expense section to All section and localStorage
function updateAllItems() {
  // Clear previously added items
  allItems.innerHTML = '';

  // Clone income items and append to All
  const incomeListItems = incomeItems.querySelectorAll('.db-item');
  incomeListItems.forEach((value) => {
    // To All section
    const clonedValue = value.cloneNode(true);
    clonedValue.style.color = '#148814';
    allItems.append(clonedValue);
  });

  // Clone expense items and append to All
  const expenseListItems = expenseItems.querySelectorAll('.db-item');
  expenseListItems.forEach((value) => {
    // To All section
    const clonedValue = value.cloneNode(true);
    clonedValue.style.color = '#ec2222';
    allItems.append(clonedValue);
  });
}

// Add Income and Expense items to localStorage
function updateLocalStorage() {
  // Clear previously added items
  localStorage.clear();

  // Add Income items to localStorage
  const incomeListItems = incomeItems.querySelectorAll('.db-item');
  incomeListItems.forEach((value) => {
    // Get previously added items
    const localItems =
      localStorage.getItem('income') !== null
        ? JSON.parse(localStorage.getItem('income'))
        : {};

    // Corresponding p element of value
    const p = value.querySelector('p');
    // Array destructuring
    let [title, amount] = p.innerText.split(':').map((value) => value.trim());
    amount = parseInt(amount);
    const localEntry = {};
    localEntry[title] = amount;
    const localItem = JSON.stringify({ ...localItems, ...localEntry });
    // Add to localStorage
    localStorage.setItem('income', localItem);
  });

  // Add Expense items to localStorage
  const expenseListItems = expenseItems.querySelectorAll('.db-item');
  expenseListItems.forEach((value) => {
    // Get previously added items
    const localItems =
      localStorage.getItem('expense') !== null
        ? JSON.parse(localStorage.getItem('expense'))
        : {};

    // Corresponding p element of value
    const p = value.querySelector('p');
    // Array destructuring
    let [title, amount] = p.innerText.split(':').map((value) => value.trim());
    amount = parseInt(amount);
    const localEntry = {};
    localEntry[title] = amount;
    const localItem = JSON.stringify({ ...localItems, ...localEntry });
    // Add to localStorage
    localStorage.setItem('expense', localItem);
  });
}

// Update amounts in the document
function updateAmounts() {
  balanceAmt = incomeAmt - expenseAmt;

  incomeAmtEl.innerText = incomeAmt;
  expenseAmtEl.innerText = expenseAmt;
  balanceAmtEl.innerText = balanceAmt;
}

// Edit or Delete the item
function updateItem(ev) {
  const targetElement = ev.target;

  // Check whether targetElement is Edit icon
  if (targetElement.classList.contains('edit')) {
    // Corresponding p element
    const p = targetElement.parentElement.previousElementSibling;
    // Array destructuring
    const [title, amount] = p.innerText.split(':');

    // Corresponding form element
    const formEl =
      targetElement.parentElement.parentElement.parentElement
        .nextElementSibling;
    // Configure form input fields for edit
    formEl.querySelector('.input-title').value = title.trim();
    formEl.querySelector('.input-amount').value = amount.trim();
    // Focus on the amount field
    formEl.querySelector('.input-amount').focus();

    // Update amounts
    if (
      targetElement.parentElement.parentElement.parentElement.classList.contains(
        'db-income-items'
      )
    ) {
      incomeAmt -= parseInt(amount.trim());
    } else if (
      targetElement.parentElement.parentElement.parentElement.classList.contains(
        'db-expense-items'
      )
    ) {
      expenseAmt -= parseInt(amount.trim());
    }

    // Delete the item
    targetElement.parentElement.parentElement.remove();

    // Update amounts in the document
    updateAmounts();

    // Update items in All section
    updateAllItems();
    // Update items in localStorage
    updateLocalStorage();
  } else if (targetElement.classList.contains('delete')) {
    // Check whether targetElement is Delete icon
    // Corresponding p element
    const p = targetElement.parentElement.previousElementSibling;
    // Array destructuring
    const [title, amount] = p.innerText.split(':');

    // Update amounts
    if (
      targetElement.parentElement.parentElement.parentElement.classList.contains(
        'db-income-items'
      )
    ) {
      incomeAmt -= parseInt(amount.trim());
    } else if (
      targetElement.parentElement.parentElement.parentElement.classList.contains(
        'db-expense-items'
      )
    ) {
      expenseAmt -= parseInt(amount.trim());
    } else if (
      targetElement.parentElement.parentElement.parentElement.classList.contains(
        'db-all-items'
      )
    ) {
      // First delete the item in Income/Expense section
      // If the item belongs to Income section
      if (
        targetElement.parentElement.parentElement.style.color === greenColor
      ) {
        const incomeListItems = incomeItems.querySelectorAll('.db-item');

        // Delete the style attribute to successfully compare elements
        targetElement.parentElement.parentElement.getAttribute('style');
        targetElement.parentElement.parentElement.removeAttribute('style');

        // Traverse through list items and delete the required item
        [...incomeListItems].some((value) => {
          if (value.isEqualNode(targetElement.parentElement.parentElement)) {
            value.querySelector('.delete').click();
            return true;
          }
        });

        return;
      } else if (
        // If the item belongs to Expense section
        targetElement.parentElement.parentElement.style.color === redColor
      ) {
        const expenseListItems = expenseItems.querySelectorAll('.db-item');

        // Delete the style attribute to successfully compare elements
        targetElement.parentElement.parentElement.getAttribute('style');
        targetElement.parentElement.parentElement.removeAttribute('style');

        // Traverse through list items and delete the required item
        [...expenseListItems].some((value) => {
          if (value.isEqualNode(targetElement.parentElement.parentElement)) {
            value.querySelector('.delete').click();
            return true;
          }
        });

        return;
      }
    }
    // Delete the item
    targetElement.parentElement.parentElement.remove();

    // Update amounts in the document
    updateAmounts();

    // Update items in All section
    updateAllItems();
    // Update items in localStorage
    updateLocalStorage();
  }
}

// Checks whether amount value is positive or not
function validateAmount(amountValue) {
  return parseInt(amountValue) >= 0;
}

// Scroll to the bottom of the page when a new item is added
function scrollToBottom(element) {
  element.scrollTop = element.scrollHeight;
}

// Read form input fields and append the item
function submitItem(ev) {
  // Prevent the default behaviour of form submission
  ev.preventDefault();

  // Read title and amount
  const title = ev.target.querySelector('.input-title');
  const titleValue = title.value.trim();
  const amount = ev.target.querySelector('.input-amount');
  const amountValue = amount.value.trim();
  // Check for non negative number
  const validatedAmountValue = validateAmount(amountValue);

  // If fields are valid
  if (titleValue && validatedAmountValue) {
    // Clear error selection if added previously
    title.parentElement.classList.remove('error');
    amount.parentElement.classList.remove('error');

    // Create a new item
    const li = document.createElement('li');
    li.classList.add('db-item');
    li.innerHTML = `
      <p>${titleValue} : <i class="rupee fas fa-rupee-sign"></i
      > ${amountValue}</p>
      <div class="icons">
        <i class="edit fas fa-edit"></i>
        <i class="delete fas fa-trash-alt"></i>
      </div>
    `;

    // Get previous element and append item to it
    const previousElement = ev.target.previousElementSibling;
    previousElement.append(li);

    // Scroll to the bottom
    scrollToBottom(previousElement);

    // Update items in All section
    updateAllItems();
    // Update items in localStorage
    updateLocalStorage();

    // Update tracker
    if (previousElement.classList.contains('db-income-items')) {
      incomeAmt += parseInt(amountValue);
    } else if (previousElement.classList.contains('db-expense-items')) {
      expenseAmt += parseInt(amountValue);
    }

    // Update amounts in the document
    updateAmounts();

    // Clear form input fields
    title.value = '';
    amount.value = '';
  } else {
    // If title field is empty
    if (titleValue === '') {
      title.parentElement.classList.add('error');
    } else {
      title.parentElement.classList.remove('error');
    }

    // If amount field is empty
    if (amountValue === '' || !validatedAmountValue) {
      amount.parentElement.classList.add('error');
    } else {
      amount.parentElement.classList.remove('error');
    }
  }
}

// On load
fetchFromLocalStorage();

// Listen to submit event on incomeForm
incomeForm.addEventListener('submit', submitItem);
// Listen to submit event on expenseForm
expenseForm.addEventListener('submit', submitItem);
// Listen to click event on dbMenu
dbMenu.addEventListener('click', toggleMenuItems);
// Listen to click event on dashboard
dashboard.addEventListener('click', updateItem);
