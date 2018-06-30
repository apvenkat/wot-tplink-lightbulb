var express = require('express');
var path = require('path');
var app = express();
var route = require('./routes/routes.js');

app.use('/bulb', route);
app.use(express.static(__dirname + '/routes'));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname +'/views/index.html'));
});
app.listen(8000, function () {
  console.log('Example app listening on port 8000!')
})
