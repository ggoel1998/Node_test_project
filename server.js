const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/todos', require('./routes/todos'))

app.use(express.static(__dirname + '/public'))

app.listen(5000, () => {
  console.log('http://localhost:5000')
})