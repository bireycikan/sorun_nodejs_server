const express = require('express');
const app = express();
const debug = require('debug')('node:server');


const port = process.env.PORT || 5000;
app.listen(port, () => {
  debug(`Node server is listening on port ${port}...`);
})