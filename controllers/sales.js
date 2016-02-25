'use strict';

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db/chinook.sqlite');

function moneyFormat (input) {
  const data = input.map(obj => {
    const currencyDecimalPlaces = 2;
    obj.total = +obj.total.toFixed(currencyDecimalPlaces)
    return obj;
  });
  return data;
}

module.exports.employee = (req, res) => {
  db.all(`SELECT SUM(Invoice.Total) AS "total",
  Employee.LastName AS last,
  Employee.FirstName AS first
  FROM Customer
  JOIN Employee ON Customer.SupportRepId = Employee.EmployeeId
  JOIN Invoice ON Customer.CustomerId = Invoice.CustomerId
  GROUP BY Employee.EmployeeId;`, (err, data) => {
    if (err) throw err;
    res.send({
      info: "Total Sales by Employee",
      data: moneyFormat(data)
    });
  });
};

module.exports.country = (req, res) => {
  db.all(`SELECT SUM(Invoice.Total) AS "total", BillingCountry AS country
  FROM Invoice
  GROUP BY Country
  ORDER BY Country;`, (err, data) => {
    if (err) throw err;
    res.send({
      info: "Total Sales by Country",
      data: moneyFormat(data)
    });
  });
};

module.exports.year = (req, res) => {
  let having = '';
  if (req.query.filter) {
    having = 'HAVING';
    req.query.filter.year
      .split(',')
      .map(y => +y)
      .forEach(y => {
        having += ` year = '${y}' OR`
      }
    );
    having = having.substring(0, having.length - 3); // eslint-disable-line no-magic-numbers
  }
  db.all(`SELECT COUNT(*) as invoices,
  SUM(Total) as total,
  SUBSTR(InvoiceDate, 1, 4) as year
  FROM Invoice
  GROUP BY year
  ${having};`, (err, data) => {
    if (err) throw err;
    res.send({
      info: "Total Sales by Year",
      data: moneyFormat(data)
    });
  });
};
