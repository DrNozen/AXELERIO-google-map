const express = require('express')
const app = express()
const data = require('./parc-des-installations-de-production.json')

app.use('/', express.static('public'))

app.get('/api', function (req, res) {
    res.json(data);
  })

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})