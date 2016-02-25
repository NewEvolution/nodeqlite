'use strict';

const router = require('express').Router();
const salesC = require('../controllers/sales');

router.get('/employee', salesC.employee)
      .get('/country', salesC.country)
      .get('/year', salesC.year);

module.exports = router;
