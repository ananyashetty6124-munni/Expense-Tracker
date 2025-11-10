// Select elements
const nameInput = document.getElementById('name');
const amountInput = document.getElementById('amount');
const addBtn = document.getElementById('addExpense');
const expenseList = document.getElementById('expenseList');

// Add click event
addBtn.addEventListener('click', function() {
    const name = nameInput.value.trim();
    const amount = amountInput.value.trim();

    if(name === "" || amount === "") {
        alert("Please fill both fields!");
        return;
    }

    // Show expense on page
    const div = document.createElement('div');
    div.textContent = `${name} - ₹${amount}`;
    expenseList.appendChild(div);

    // Clear inputs
    nameInput.value = "";
    amountInput.value = "";
});
