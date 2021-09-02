const express = require('express');
const app = express();
const debug = require('debug')('node:server');
const bodyParser = require('body-parser');
const main = require('./routes');
const branches = require('./routes/branches');


// middlewares setup
app.use(bodyParser.json({ limit: '16mb' }))

//routes setup
app.use('/api', main);
app.use('/api/branches', branches);


const port = process.env.PORT || 5000;
app.listen(port, () => {
  debug(`Node server is listening on port ${port}...`);
})