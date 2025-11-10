// server.js

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Serve static frontend files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Path to expenses JSON file
const expensesFile = path.join(__dirname, 'expenses.json');

// --- Routes ---

// Get all expenses
app.get('/expenses', (req, res) => {
  fs.readFile(expensesFile, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading expenses');
    res.json(JSON.parse(data || '[]'));
  });
});

// Add a new expense
app.post('/expenses', (req, res) => {
  const newExpense = req.body;

  fs.readFile(expensesFile, 'utf8', (err, data) => {
    const expenses = JSON.parse(data || '[]');
    expenses.push(newExpense);

    fs.writeFile(expensesFile, JSON.stringify(expenses, null, 2), (err) => {
      if (err) return res.status(500).send('Error saving expense');
      res.status(201).json(newExpense);
    });
  });
});

// Catch-all route for frontend routing
app.get('/:any*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
