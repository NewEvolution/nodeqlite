'use strict'

const router = require('express').Router();
const salesR = require('./sales');

router.use('/total-sales', salesR);

module.exports = router;
