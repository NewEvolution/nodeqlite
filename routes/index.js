'use strict'

const router = require('express').Router();
const salesR = require('./sales');

router.use('/sales', salesR);

module.exports = router;
