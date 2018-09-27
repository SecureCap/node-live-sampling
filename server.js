const express = require('express');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');
const app = express();
const routes = require('./routes')
const passport = require('passport')
const PORT = process.env.PORT || 3001
const User = require('./models/User')
const LocalStrategy = require('passport-local').Strategy

// Setup body parser and cookie parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser())
// Serve up static assets
app.use(express.static('client/build'))

// Setup express session
app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}))

// Setup Passport
app.use(passport.initialize())
app.use(passport.session())

// Passport config
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// Setup API routes
app.use(routes)

// Connect to mongo and set it up to use promises
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/node-live-sampling',
    {
        useNewUrlParser: true
    }
)

// Start API server
app.listen(PORT, () => console.log(`API Server now listening on PORT ${PORT}`))
