const seats = document.querySelector('.seats');
const allSeats = document.querySelectorAll('.seats .seat');
const finalAmount = document.getElementById('final-amount');
const ticketCount = document.getElementById('ticket-count');
const ticketRate = document.getElementById('ticket-rate');
const footer = document.querySelector('.footer');
let currentSelectSeatType;

// Fetch saved data if available from local storage and display in UI
function populateFromLocalStorage() {
  const selectedSeatsIndexes = JSON.parse(
    localStorage.getItem('selectedSeats')
  );

  // If data is stored
  if (selectedSeatsIndexes !== null && selectedSeatsIndexes.length > 0) {
    selectedSeatsIndexes.forEach((value) => {
      [...allSeats][value].classList.add('selected');
    });

    // Set value for currentSelectSeatType
    currentSelectSeatType = [...allSeats][selectedSeatsIndexes[0]].parentElement
      .parentElement.className;

    // Display footer
    updateAmount();
    footer.classList.add('visible');
  }
}

// Update the amount for the seats selected
function updateAmount() {
  const selectedSeats = document.querySelectorAll('.seats .seat.selected');
  // If there are no seats to be booked hide footer else show it
  if (selectedSeats.length === 0) {
    footer.classList.remove('visible');
  } else {
    footer.classList.add('visible');
    ticketCount.innerText = selectedSeats.length;
    // Rate based on the type of seats selected
    ticketRate.innerText =
      currentSelectSeatType === 'classic-seats' ? 200 : 350;
    finalAmount.innerText =
      parseInt(ticketCount.innerText) * parseInt(ticketRate.innerText);
  }
}

// Keeps track of selected items in local storage
function updateStore() {
  const selectedSeats = document.querySelectorAll('.seats .seat.selected');
  // Get indexes of all selected seats
  const selectedSeatsIndexes = [...selectedSeats].map((value) =>
    [...allSeats].indexOf(value)
  );

  // Add item to local storage
  localStorage.setItem('selectedSeats', JSON.stringify(selectedSeatsIndexes));
}

// Selects and deselects seats
function seatHandler(ev) {
  if (
    ev.target.classList.contains('seat') &&
    !ev.target.classList.contains('unavailable')
  ) {
    if (ev.target.classList.contains('selected')) {
      ev.target.classList.remove('selected');
    } else {
      ev.target.classList.add('selected');

      // Ensure to select seats only of one kind (classic or recliner)
      if (!currentSelectSeatType) {
        currentSelectSeatType = ev.target.parentElement.parentElement.className;
      } else {
        if (
          ev.target.parentElement.parentElement.className !==
          currentSelectSeatType
        ) {
          const seatsToBeCleared = document.querySelectorAll(
            `.seats .${currentSelectSeatType} .seat.selected`
          );
          seatsToBeCleared.forEach((value) =>
            value.classList.remove('selected')
          );
          currentSelectSeatType =
            ev.target.parentElement.parentElement.className;

          // Empty the local storage
          localStorage.clear();
        }
      }
    }
    // Update amount
    updateAmount();
    // Update local storage
    updateStore();
  }
}

// On load
populateFromLocalStorage();

// Listen to click event on seats
seats.addEventListener('click', seatHandler);
