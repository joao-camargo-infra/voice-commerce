const express = require('express')
const port = 3000
const limiteProdutos  = 5
const bp = require('body-parser')

const app = express()

app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({ extended: false, limit: '20mb' }));
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile('/index.html')
})

var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '2A2A0b4f@',
  database: 'base_flipkart'
})

app.post('/produtos/', function(req,res){
  var palavraChave = req.body.busca
  console.log(palavraChave);
  connection.query(`SELECT * FROM base_flipkart WHERE NOME LIKE '%${palavraChave}%' LIMIT ${limiteProdutos}`, function (err, items, fields) {
    if (err) throw err;
    res.send(items)
  });
})

app.listen(port, () => {
  console.log(`Aplicação de voz ouvindo na porta http://localhost:${port}`)
})