// Select DOM elements
const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const totalAmount = document.getElementById('total-amount');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Function to add an expense
function addExpense(name, amount) {
  const expense = { id: Date.now(), name, amount: parseFloat(amount) };
  expenses.push(expense);
  saveExpenses();
  renderExpenses();
}

// Function to edit an expense
function editExpense(id) {
  const name = prompt("Edit the expense name:");
  const amount = prompt("Edit the expense amount:");
  if (name && amount) {
    const expense = expenses.find(exp => exp.id === id);
    expense.name = name;
    expense.amount = parseFloat(amount);
    saveExpenses();
    renderExpenses();
  }
}

// Function to delete an expense
function deleteExpense(id) {
  expenses = expenses.filter(exp => exp.id !== id);
  saveExpenses();
  renderExpenses();
}

// Save expenses to local storage
function saveExpenses() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Render the expense list and total
function renderExpenses() {
  expenseList.innerHTML = '';
  let total = 0;

  expenses.forEach(exp => {
    total += exp.amount;

    const li = document.createElement('li');
    li.className = 'expense-item';
    li.innerHTML = `
      ${exp.name}: $${exp.amount.toFixed(2)}
      <div>
        <button onclick="editExpense(${exp.id})">Edit</button>
        <button onclick="deleteExpense(${exp.id})">Delete</button>
      </div>
    `;
    expenseList.appendChild(li);
  });

  totalAmount.textContent = total.toFixed(2);
}

// Handle form submission
expenseForm.addEventListener('submit', event => {
  event.preventDefault();
  const name = document.getElementById('expense-name').value;
  const amount = document.getElementById('expense-amount').value;
  
  if (name && amount) {
    addExpense(name, amount);
    expenseForm.reset();
  }
});

// Initial render
renderExpenses();

