"use strict";
const transactionUl = document.querySelector("#transactions");
const inscomeDisplay = document.querySelector("#money-plus");
const expenseDisplay = document.querySelector("#money-minus");
const balanceDisplay = document.querySelector("#balance");
const form = document.querySelector("#form");
const inputTransactionName = document.querySelector("#text");
const inputTransactionAmount = document.querySelector("#amount");

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

const removeTransaction = (ID) => {
  transactions = transactions.filter((transaction) => transaction.id !== ID);
  updateLocalStorage();
  init();
};

const addTransactionIntoDom = ({ amount, name, id }) => {
  const operator = amount < 0 ? "-" : "+";
  const cssClass = amount < 0 ? "minus" : "plus";
  const amountWithoutOperator = Math.abs(amount);
  const li = document.createElement("li");

  li.classList.add(cssClass);
  li.innerHTML = `${name}
  <span>${operator} ${amountWithoutOperator} €</span>
  <button class="delete-btn" onClick="removeTransaction(${id})">x</button>`;
  transactionUl.append(li);
};
const getExpenses = (transactionsAmounts) =>
  Math.abs(
    transactionsAmounts
      .filter((value) => value < 0)
      .reduce((acc, value) => acc + value, 0)
  ).toFixed(2);

const getIncome = (transactionsAmounts) =>
  transactionsAmounts
    .filter((value) => value > 0)
    .reduce((acc, value) => acc + value, 0)
    .toFixed(2);

const getTotal = (transactionsAmounts) =>
  transactionsAmounts.reduce((acc, trans) => acc + trans, 0).toFixed(2);

const updateBalanceValues = () => {
  const transactionsAmounts = transactions.map(({ amount }) => amount);
  const total = getTotal(transactionsAmounts);
  const income = getIncome(transactionsAmounts);
  const expense = getExpenses(transactionsAmounts);

  balanceDisplay.textContent = `${total} €`;
  inscomeDisplay.textContent = `${income} €`;
  expenseDisplay.textContent = `${expense} €`;
};

const init = () => {
  transactionUl.innerHTML = "";
  transactions.forEach(addTransactionIntoDom);
  updateBalanceValues();
};
init();

const updateLocalStorage = () => {
  localStorage.setItem("transactions", JSON.stringify(transactions));
};

const generateID = () => Math.round(Math.random() * 1000);

const addToTransactionsArray = (transactionName, transactionAmount) => {
  transactions.push({
    id: generateID(),
    name: transactionName,
    amount: +transactionAmount,
  });
};

const cleanInputs = () => {
  inputTransactionName.value = inputTransactionAmount.value = "";
};

const handlerFormSubmit = (event) => {
  event.preventDefault();
  const transactionName = inputTransactionName.value.trim();
  const transactionAmount = inputTransactionAmount.value.trim();
  const isSomeInputEmpty = transactionName === "" || transactionAmount === "";

  if (isSomeInputEmpty) {
    alert("Please complete all required fields ");
    return;
  }

  addToTransactionsArray(transactionName, transactionAmount);
  init();
  updateLocalStorage();
  cleanInputs();
};
form.addEventListener("submit", handlerFormSubmit);
