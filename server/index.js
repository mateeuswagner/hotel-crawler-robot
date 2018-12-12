var express = require('express');
var app = express();

app.post('/buscar', function (req, res) {
  // Crawler
  let code = 200;
  res.status(code).send({
      message: 'Response',
      code
  });
});

app.listen(3000, function () {
  console.log('Hotel crawler robot app is listening!');
});