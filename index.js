const express = require('express')
const app = express()
var path = require('path');
const port = 3000

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile('/index.html')
})

var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '2A2A0b4f@'
})

connection.connect(console.log("Conectado à base de dados"))

app.listen(port, () => {
  console.log(`Aplicação de voz ouvindo na porta http://localhost:${port}`)
})

//connection.end(console.log("Desconectando da base de dados"))