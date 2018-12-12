const express = require('express');
const app = express();
const router = express.Router();

const routes = require('./routes');

routes(router);

app.use('/', router);

app.listen(3000, function () {
  console.log('Hotel crawler robot app is listening!');
});