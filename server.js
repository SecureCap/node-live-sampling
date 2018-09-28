const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport')
const jwt = require('jsonwebtoken')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt') 

const app = express();
const routes = require('./routes')
const PORT = process.env.PORT || 3001
const User = require('./models/User')


const passportOpts = {
    // Set Extraction method to pull it out from our header
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || 'secretkey'
}

// Set passport to use JWT Strategy
passport.use(new JwtStrategy(
    passportOpts,
    (jwt_payload, done) => {
        console.log(jwt_payload);
        User.findOne({_id: jwt_payload._id}, (err, user) => {
            if (err) {
                return done(err, false)
            }
            console.log("user", user)
            if (user) {
                done(null, user)    
            } else {
                done(null, false)
            }
        })
    }
))


// Setup body parser and cookie parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static assets
app.use(express.static('client/build'))


// Setup API routes
app.post('/api/auth/register', (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.json({ success: false, message: "Please provide a username and password" })
    }

    User.create({
        username: req.body.username,
        password: req.body.password
    }, (err, user) => {
        if (err) {
            return res.json({ success: false, message: "username taken", err: err.message })
        }
        // Redirect the user to /auth/login so they can be logged in after registering
        res.redirect(307, "/api/auth/login")
    })
})

app.post('/api/auth/login', (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.json({ success: false, message: "Please provide a username and password" })
    }

    User.findOne({
        username: req.body.username
    }, (err, user) => {
        if (!user) {
            // we don't have this user, we can't login
            return res.status(401).send({ success: false, message: "Incorrect username or password" })
        } else {
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (!err && isMatch) {
                    const jwtSecret = process.env.JWT_SECRET || 'secretkey'
                    // TODO: Let's consider adding an expiration timer to each token
                    //       so that we can keep it in LocalStorage in the ui
                    const token = jwt.sign({_id: user._id}, jwtSecret)
                    res.json({ success: true, token: "JWT " + token})
                } else {
                    return res.status(401).send({ success: false, message: "Incorrect username or password"})
                }
            })
        }
    })
})

// Our private route that we want to protect (i.e. profile pages)
app.get('/api/private/route', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({accessible: true})
})

app.get('/api/auth/logout', (req, res) => {
    req.logout()
    res.status(200).send('Successfully logged out!')
});

// Connect to mongo and set it up to use promises
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/node-live-sampling',
    {
        useNewUrlParser: true
    }
)

// Start API server
app.listen(PORT, () => console.log(`API Server now listening on PORT ${PORT}`))
