const hourHand = document.querySelector('.hour');
const minuteHand = document.querySelector('.minute');
const secondHand = document.querySelector('.second');

// Find the current time and update the clock accordingly
function updateClock() {
  // Destructuring hour, minute and second from resultant array
  let [hour, minute, second] = new Date()
    .toLocaleTimeString('en-US')
    .split(/:| /);
  // Convert hour in 24-hour format to 12-hour format
  hour = hour > 12 ? hour - 12 : hour;

  // Calculate the rotation value based on the current time
  const secondHandRotation = second * 6 + 'deg';
  const secondRatio = second / 60;
  const minuteHandRotation = (secondRatio + parseInt(minute)) * 6 + 'deg';
  const minuteRatio = minute / 60;
  const hourHandRotation = (minuteRatio + parseInt(hour)) * 30 + 'deg';

  // Perform changes in the DOM
  hourHand.style.setProperty('--rotation', hourHandRotation);
  minuteHand.style.setProperty('--rotation', minuteHandRotation);
  secondHand.style.setProperty('--rotation', secondHandRotation);
}

// Calls updateClock after each second
setInterval(updateClock, 1000);

// On load
updateClock();
