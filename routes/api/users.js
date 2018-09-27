// Register route and profile routes should go here
const passport = require('passport') 
const User = require('../../models/User')
const router = require('express').Router()

router.post('/register', (req, res) => {
    User.register(new User({username: req.body.username}), req.body.password,
    (err, user) => {
        if (err) {
            return res.status(500).send(err.message)
        }
        passport.authenticate('local')((req, res, () => {
            res.json(user)
            // res.status(200).send("User successfully created")
        }))
    })
})

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.status(200).send("Logged in!")
})

router.get('/logout', (req, res) => {
    req.logout()
    res.status(200).send('Successfully logged out!')
});

module.exports = router