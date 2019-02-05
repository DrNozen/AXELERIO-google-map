const express = require('express')
const app = express()
const data = require('./parc-des-installations-de-production.json')
// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;
app.use('/', express.static('public'))

app.get('/api', function (req, res) {
    res.json(data);
  })

app.listen(port, function () {
  console.log('Example app listening on port ' + port)
})