// Register route and profile routes should go here
const passport = require('../../config/passport') 
const User = require('../../models/User')
const router = require('express').Router()

router.post('/auth/register', (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.json({ success: false, message: "Please provide a username and password"})
    }

    const newUser = new User({
        username: req.body.username,
        password: req.body.password
    })

    newUser.save(err => {
        if (err) {
            return res.json({ success: false, message: "username taken"})
        }
        return res.json({ success: true, message: "Successfully created a new user!"})
    })
})

router.post('/auth/login', passport.authenticate('local'), (req, res) => {
    res.status(200).send("Logged in!")
})

router.get('/auth/logout', (req, res) => {
    req.logout()
    res.status(200).send('Successfully logged out!')
});

module.exports = router