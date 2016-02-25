'use strict';

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db/chinook.sqlite');

db.each('SELECT * FROM Employee', (err, res) => {
  if (err) throw err;
  console.log(res);
});
