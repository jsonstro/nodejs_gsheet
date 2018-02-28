// index.js
const path = require('path')
const express = require('express')
const port = 3000
const fs = require('fs')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser');
const app = express()

//app.get('/', (request, response) => {
//  response.send('Hello from Express!')
//})

app.use(bodyParser.json());

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (request, response) => {
  response.render('home', {
    name: 'John'
  })
})

app.post('/users', function (req, res) {
    const user = req.body
    fs.appendFile('users.txt', JSON.stringify({ name: user.name, age: user.age }), (err) => {
        res.send('successfully registered')
    })
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
