// index.js

const path = require('path')
const express = require('express')
const fs = require('fs')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser');

const app = express()
const port = 3000

app.use(bodyParser.json());

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static('public/images'));

app.get('/', (request, response) => {
  response.render('home', {
    fname: 'John',
    lname: 'Doe',
    address: '123 Basic St.\nSanta Cruz, CA 95060',
    fwver: '1.1.2',
    motorsn: '23423545',
    shipdate: '12/24/17',
    mfgdate: '10/18/17',
    netsuite: '12323'
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
