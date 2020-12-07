const draggableList = document.getElementById('draggable-list');
const checkBtn = document.getElementById('btn');

// List of top 10 richest people stored in correct order
const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Bernard Arnault',
  'Warren Buffett',
  'Larry Ellison',
  'Amancio Ortega',
  'Mark Zuckerberg',
  'Jim Walton',
  'Alice Walton',
  'Rob Walton',
];

// Array to store list items
const listItems = [];
// Store the index of dragging item
let dragStartIndex;

createList();

// Creates a list in random order and puts into the DOM
function createList() {
  [...richestPeople]
    .map((person) => ({ sort: Math.random(), value: person }))
    .sort((a, b) => a.sort - b.sort)
    .map((personObj) => personObj.value)
    .forEach((person, index) => {
      const listItem = document.createElement('li');
      listItem.setAttribute('data-index', index);
      listItem.innerHTML = `
      <span class="number">${index + 1}</span>
      <div class="draggable-item" draggable="true">
        <p class="person-name">${person}</p>
        <i class="draggable-icon fas fa-grip-lines"></i>
      </div>
    `;
      listItems.push(listItem);
      draggableList.appendChild(listItem);
    });

  registerEventListeners();
}

// Swap the positions of DOM elements
function swapPositions(startIndex, endIndex) {
  const fromElement = listItems[startIndex].querySelector('.draggable-item');
  const toElement = listItems[endIndex].querySelector('.draggable-item');

  listItems[startIndex].appendChild(toElement);
  listItems[endIndex].appendChild(fromElement);
}

function dragStart() {
  dragStartIndex = parseInt(this.closest('li').getAttribute('data-index'));
}

function dragEnter(ev) {
  ev.preventDefault();
  this.classList.add('drag-over');
}

function dragOver(ev) {
  ev.preventDefault();
  this.classList.add('drag-over');
}

function dragLeave() {
  this.classList.remove('drag-over');
}

function drop() {
  this.classList.remove('drag-over');
  const dragEndIndex = parseInt(this.getAttribute('data-index'));

  swapPositions(dragStartIndex, dragEndIndex);
}

// Registers events on required items
function registerEventListeners() {
  const draggableItems = document.querySelectorAll('.draggable-item');
  const draggableListItems = document.querySelectorAll('.draggable-list li');

  draggableItems.forEach((item) => {
    item.addEventListener('dragstart', dragStart);
  });

  draggableListItems.forEach((listItem) => {
    listItem.addEventListener('dragenter', dragEnter);
    listItem.addEventListener('dragover', dragOver);
    listItem.addEventListener('dragleave', dragLeave);
    listItem.addEventListener('drop', drop);
  });
}

// Checks the order of richest people
function checkOrder() {
  listItems.forEach((item, index) => {
    const personName = item.querySelector('.person-name').textContent;
    if (personName === richestPeople[index]) {
      item.classList.remove('wrong');
      item.classList.add('right');
    } else {
      item.classList.remove('right');
      item.classList.add('wrong');
    }
  });
}

// Listen to click event on checkBtn
checkBtn.addEventListener('click', checkOrder);
