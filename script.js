let transactions = [];

document.getElementById('add-transaction').addEventListener('click', addTransaction);

function addTransaction() {
  const desc = document.getElementById('description').value;
  const amt = parseFloat(document.getElementById('amount').value);
  const type = document.getElementById('type').value;

  if (!desc || isNaN(amt)) {
    alert('Please enter valid description and amount');
    return;
  }

  const transaction = { description: desc, amount: amt, type };
  transactions.push(transaction);
  renderTransactions();
}

function renderTransactions() {
  const list = document.getElementById('transaction-list');
  const balanceElem = document.getElementById('balance');
  const incomeElem = document.getElementById('total-income');
  const expenseElem = document.getElementById('total-expense');

  list.innerHTML = '';
  let balance = 0;
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((t) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${t.description} - $${t.amount}</span>
      <span class="${t.type}">${t.type === 'income' ? '+' : '-'}${t.amount}</span>
    `;
    list.appendChild(li);

    if (t.type === 'income') {
      totalIncome += t.amount;
      balance += t.amount;
    } else {
      totalExpense += t.amount;
      balance -= t.amount;
    }
  });

  balanceElem.textContent = balance.toFixed(2);
  incomeElem.textContent = totalIncome.toFixed(2);
  expenseElem.textContent = totalExpense.toFixed(2);
}
