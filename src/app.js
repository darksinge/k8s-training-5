const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const app = express()

app.engine('.hbs', exphbs({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views/'))

app.get('/', (req, res) => {
  return res.render('index')
})

app.get('/:name', (req, res) => {
  return res.render('home', {
    ...req.params
  })
})

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`)
})

