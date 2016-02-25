'use strict';

const localPort = 3000;
const port = process.env.PORT || localPort;

const express = require('express');
const app = express();

const routes = require('./routes/');
app.use(routes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
