// List of common currencies
const currencies = ["USD", "EUR", "INR", "GBP", "JPY", "CAD", "AUD"];

const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const amountInput = document.getElementById("amount");
const result = document.getElementById("result");
const convertBtn = document.getElementById("convert-btn");

// Fill the dropdowns
currencies.forEach((currency) => {
  const option1 = document.createElement("option");
  option1.value = currency;
  option1.textContent = currency;

  const option2 = document.createElement("option");
  option2.value = currency;
  option2.textContent = currency;

  fromCurrency.appendChild(option1);
  toCurrency.appendChild(option2);
});

// Set default values
fromCurrency.value = "USD";
toCurrency.value = "INR";

// Handle conversion
convertBtn.addEventListener("click", () => {
  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (isNaN(amount)) {
    result.textContent = "Please enter a valid amount.";
    return;
  }

  // Use free API for exchange rates
  const url = `https://api.exchangerate-api.com/v4/latest/${from}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[to];
      const convertedAmount = (amount * rate).toFixed(2);
      result.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
    })
    .catch(() => {
      result.textContent = "Error fetching exchange rates. Please try again.";
    });
});
