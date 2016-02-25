'use strict';

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
