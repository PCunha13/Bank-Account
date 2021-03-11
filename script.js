"use strict";
const transactionUl = document.querySelector("#transactions"); //ref da ul
const inscomeDisplay = document.querySelector("#money-plus");
const expenseDisplay = document.querySelector("#money-minus");
const balanceDisplay = document.querySelector("#balance");
const form = document.querySelector("#form");
const inputTransactionName = document.querySelector("#text");
const inputTransactionAmount = document.querySelector("#amount");

const dummyTransactions = [
  { id: 1, name: "Cake", amount: -20 },
  { id: 2, name: "Salary", amount: 300 },
  { id: 3, name: "Coffee", amount: -10 },
  { id: 4, name: "Sunglasses", amount: 150 },
];

//Arrow Function transaction recebe array de objectos representa transação
const addTransactionIntoDom = (transaction) => {
  const operator = transaction.amount < 0 ? "-" : "+";
  const cssClass = transaction.amount < 0 ? "minus" : "plus"; //vou criar uma nova classEL HTML
  const amountWithoutOperator = Math.abs(transaction.amount);
  const li = document.createElement("li"); //estou criar novo elemento HTML

  li.classList.add(cssClass); //<li class="plus"> ou minus!!
  li.innerHTML = `${transaction.name}<span>${operator} ${amountWithoutOperator} €</span><button class="delete-btn">x</button>`;
  transactionUl.append(li); //meter li como last child de ul
};

const updateBalanceValues = () => {
  const transactionsAmounts = dummyTransactions.map(
    (transaction) => transaction.amount
  );
  const total = transactionsAmounts
    .reduce((acc, trans) => acc + trans, 0)
    .toFixed(2);
  balanceDisplay.textContent = `${total} €`;
  const income = transactionsAmounts
    .filter((value) => value > 0)
    .reduce((acc, value) => acc + value, 0)
    .toFixed(2);
  inscomeDisplay.textContent = `${income} €`;

  const expense = Math.abs(
    transactionsAmounts
      .filter((value) => value < 0)
      .reduce((acc, value) => acc + value, 0)
  ).toFixed(2);
  expenseDisplay.textContent = `${expense} €`;
};

//vai adicionar transações no DOM
const init = () => {
  dummyTransactions.forEach(addTransactionIntoDom);
  updateBalanceValues();
};
init();

const generateID = () => Math.round(Math.random() * 1000); // entre  0 e 1000

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const transctionName = inputTransactionName.value.trim();
  const transactionAmount = inputTransactionAmount.value.trim();

  if (transctionName === "" || transactionAmount === "") {
    //certificar q campos sao preenchidos
    alert("Please complete all required fields ");
    return;
  }
  const transaction = {
    id: generateID(),
    name: transctionName,
    amount: transactionAmount,
  };
  console.log(transaction);
});
