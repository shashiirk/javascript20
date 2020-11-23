const firstCurrencyInput = document.getElementById('first-currency');
const firstSelect = document.getElementById('first-select');
const secondCurrencyInput = document.getElementById('second-currency');
const secondSelect = document.getElementById('second-select');

let firstCurrencyValue;
let secondCurrencyValue;
let firstCurrencyType = firstSelect.value;
let secondCurrencyType = secondSelect.value;
let targetElement;
let unitConversionRate;

// Object to store latest currency rates
let rates = {};

// Fetch the latest currency rates
async function fetchRates() {
  try {
    const response = await fetch('https://open.exchangerate-api.com/v6/latest');
    const data = await response.json();
    rates = data.rates;
  } catch (error) {
    console.log(error);
  }
}

// Perform conversions and update DOM
async function convertCurrency(ev) {
  try {
    await fetchRates();

    firstCurrencyValue = parseInt(firstCurrencyInput.value);
    secondCurrencyValue = parseInt(secondCurrencyInput.value);
    targetElement = ev.target.id;

    // Swap currencies if same types were selected
    if (firstSelect.value === secondSelect.value) {
      if (targetElement === 'first-select') {
        secondSelect.value = firstCurrencyType;
      } else {
        firstSelect.value = secondCurrencyType;
      }
    }

    firstCurrencyType = firstSelect.value;
    secondCurrencyType = secondSelect.value;

    if (
      (targetElement === 'first-currency' && !isNaN(firstCurrencyValue)) ||
      ((targetElement === 'first-select' ||
        targetElement === 'second-select') &&
        !isNaN(firstCurrencyValue))
    ) {
      unitConversionRate = rates[secondCurrencyType] / rates[firstCurrencyType];
      secondCurrencyInput.value = (
        firstCurrencyValue * unitConversionRate
      ).toFixed(2);
    } else if (
      targetElement === 'second-currency' &&
      !isNaN(secondCurrencyValue)
    ) {
      unitConversionRate = rates[firstCurrencyType] / rates[secondCurrencyType];
      firstCurrencyInput.value = (
        secondCurrencyValue * unitConversionRate
      ).toFixed(2);
    } else {
      firstCurrencyInput.value = '';
      secondCurrencyInput.value = '';
    }
  } catch (error) {
    console.log(error);
  }
}

// Event listeners
firstCurrencyInput.addEventListener('input', convertCurrency);
firstSelect.addEventListener('change', convertCurrency);
secondCurrencyInput.addEventListener('input', convertCurrency);
secondSelect.addEventListener('change', convertCurrency);
