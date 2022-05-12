// put process.env in the global scope
const dotenv = require("dotenv")
dotenv.config()

const express = require('express');
const app = express();
const path = require('path')
const session = require('express-session');

const config = require('./public/javascripts/config/index')

const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/user')

const userRoutes = require('./routes/users')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    // res.send('Hello!')
    res.render('home')
})

app.get('/map', (req, res) => {
    res.render('map', { config })
})
const sessionConfig = {
    secret: "this should be a secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + (1000 * 60 * 60 * 24 * 7),
        maxAge: 1000 * 60 * 60 * 24 * 7
        // expires after a week
    }
}

app.use(express.static(path.join(__dirname, 'public')))
app.use(session(sessionConfig))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use('/', userRoutes)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Serving on ${port}`)
})


