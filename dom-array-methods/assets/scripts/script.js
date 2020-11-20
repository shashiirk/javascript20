const addUserBtn = document.getElementById('add-user-btn');
const doubleMoneyBtn = document.getElementById('double-money-btn');
const showMillionairesBtn = document.getElementById('show-millionaires-btn');
const sortUsersBtn = document.getElementById('sort-users-btn');
const calculateTotalBtn = document.getElementById('calculate-total-btn');
const items = document.getElementById('items');

// Array to store users
let users = [];

// Fetch a random user
function getUser() {
  fetch('https://randomuser.me/api?nat=us')
    .then((response) => response.json())
    .then((responseData) => responseData.results[0])
    .then((userData) => {
      const user = {
        name: `${userData.name.first} ${userData.name.last}`,
        wealth: Math.floor(Math.random() * 1000000),
      };
      pushUser(user);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Push user to users array
function pushUser(user) {
  users.push(user);
  showUsers();
}

// Format wealth representation
function formatWealth(wealth) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return formatter.format(wealth);
}

// Double the money of each user and add to DOM
function doubleMoneyHandler() {
  users = users.map((user) => ({ name: user.name, wealth: user.wealth * 2 }));
  showUsers();
}

// Show only millionaires among all users
function showMillionairesHandler() {
  users = users.filter((user) => user.wealth >= 1000000);
  showUsers();
}

// Sort users based on their wealth in decreasing order
function sortUsersHandler() {
  users.sort((a, b) => b.wealth - a.wealth);
  showUsers();
}

// Calculate total wealth and display
function calculateTotalHandler() {
  const totalWealth = users.reduce(
    (previous, current) => previous + current.wealth,
    0
  );
  const listItem = document.createElement('li');
  listItem.classList.add('total');
  listItem.innerHTML = `
    <h3>Total</h3>
    <h3>${formatWealth(totalWealth)}</h3>
  `;
  items.append(listItem);
}

// Add users to DOM
function showUsers() {
  items.innerHTML = '';
  users.forEach((user) => {
    const listItem = document.createElement('li');
    listItem.classList.add('user');
    listItem.innerHTML = `
      <h3>${user.name}</h3>
      <h3>${formatWealth(user.wealth)}</h3>
    `;
    items.append(listItem);
  });
}

// Load random users initially
function getStarted() {
  getUser();
  getUser();
  getUser();
}

// Event listeners
addUserBtn.addEventListener('click', getUser);
doubleMoneyBtn.addEventListener('click', doubleMoneyHandler);
showMillionairesBtn.addEventListener('click', showMillionairesHandler);
sortUsersBtn.addEventListener('click', sortUsersHandler);
calculateTotalBtn.addEventListener('click', calculateTotalHandler);

getStarted();
