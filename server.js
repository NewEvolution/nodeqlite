'use strict';

const localPort = 3000;
const port = process.env.PORT || localPort;

const express = require('express');
const app = express();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db/chinook.sqlite');

app.get('/sales-by-employee', (req, res) => {
  db.all(`SELECT SUM(Invoice.Total) AS "Total Sales", Employee.LastName, Employee.FirstName
  FROM Customer
  JOIN Employee ON Customer.SupportRepId = Employee.EmployeeId
  JOIN Invoice ON Customer.CustomerId = Invoice.CustomerId
  GROUP BY Employee.EmployeeId;`, (err, data) => {
    if (err) throw err;
    res.send({
      info: "Total Sales by Employee",
      data: data
    });
  });
});

app.get('/sales-by-country', (req, res) => {
  db.all(`SELECT SUM(Invoice.Total) AS "Total Sales", BillingCountry AS Country
  FROM Invoice
  GROUP BY Country
  ORDER BY Country;`, (err, data) => {
    if (err) throw err;
    res.send({
      info: "Total Sales by Country",
      data: data
    });
  });
});

app.get('/sales-per-year', (req, res) => {
  db.all(`SELECT COUNT(*) as invoices,
  SUM(Total) as total,
  SUBSTR(InvoiceDate, 1, 4) as year
  FROM Invoice
  GROUP BY year;`, (err, data) => {
    if (err) throw err;
    res.send({
      info: "Total Sales Per Year",
      data: data
    });
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
