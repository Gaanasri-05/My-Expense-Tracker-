const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let transactions = [];

form.addEventListener('submit', addTransaction);

function addTransaction(e) {
  e.preventDefault();

  const transaction = {
    id: Date.now(),
    text: text.value,
    amount: +amount.value
  };

  transactions.push(transaction);
  updateDOM();
  updateValues();
  text.value = '';
  amount.value = '';
}

function updateDOM() {
  list.innerHTML = '';
  transactions.forEach(transaction => {
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    item.innerHTML = `
      ${transaction.text} 
      <span>${sign}₹${Math.abs(transaction.amount)}</span>
    `;
    list.appendChild(item);
  });
}

function updateValues() {
  const amounts = transactions.map(t => t.amount);
  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
  const incomeTotal = amounts
    .filter(a => a > 0)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);
  const expenseTotal = (
    amounts
      .filter(a => a < 0)
      .reduce((acc, item) => acc + item, 0) * -1
  ).toFixed(2);

  // ✅ Use backticks for template strings
  balance.innerText = `₹${total}`;
  income.innerText = `+₹${incomeTotal}`;
  expense.innerText = `-₹${expenseTotal}`;
}