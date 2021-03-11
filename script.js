"use strict";
const transactionUl = document.querySelector("#transactions"); //ref da ul

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
  const transactionsAmounts = dummyTransactions
    .map((transaction) => transaction.amount)
    .reduce((acc, curr) => acc + curr);
  console.log(transactionsAmounts);
};

//vai adicionar transações no DOM
const init = () => {
  dummyTransactions.forEach(addTransactionIntoDom);
  updateBalanceValues();
};
init();
