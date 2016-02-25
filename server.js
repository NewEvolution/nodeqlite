'use strict';

const localPort = 3000;
const port = process.env.PORT || localPort;

const express = require('express');
const app = express();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db/chinook.sqlite');

db.each(`SELECT SUM(Invoice.Total) AS "Total Sales", Employee.LastName, Employee.FirstName
FROM Customer
JOIN Employee ON Customer.SupportRepId = Employee.EmployeeId
JOIN Invoice ON Customer.CustomerId = Invoice.CustomerId
GROUP BY Employee.EmployeeId;`, (err, res) => {
  if (err) throw err;
  console.log(res);
});

app.get('/', (req, res) => {
  res.send('<h1>I live, I hunger</h1>');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
