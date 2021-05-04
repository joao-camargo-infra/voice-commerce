const express = require('express')
const app = express()
var path = require('path');
const port = 3000
const limiteProdutos  = 5

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

app.get('/produtos',(req,res)=>{
  connection.query(`SELECT * FROM base_flipkart LIMIT ${limiteProdutos}`, function (err, produtos, fields) {
    if (err) throw err;
    //console.log(produtos);
    res.send(produtos)
  });
})

app.listen(port, () => {
  console.log(`Aplicação de voz ouvindo na porta http://localhost:${port}`)
})

//connection.end(console.log("Desconectando da base de dados"))