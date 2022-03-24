// put process.env in the global scope
const dotenv = require("dotenv")
dotenv.config()

const express = require('express');
const app = express();
const path = require('path')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    // res.send('Hello!')
    res.render('home')
})

app.get('/map', (req, res) => {
    res.render('map')
})

app.get('/something', (req, res) => {
    res.send("<h1><i>Something</i> will be here soon!</h1>")
})

app.get('/something/new', (req, res) => {
    res.send("<h1>Something <i>new</i> will be here soon!</h1>")
})

app.use(express.static(path.join(__dirname, 'public')))

app.listen(3000, () => {
    console.log('Serving on port3000')
})
