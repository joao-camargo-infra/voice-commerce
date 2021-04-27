const express = require('express')
const app = express()
var path = require('path');
const port = 3000

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile('/index.html')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})