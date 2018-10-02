// Register route and profile routes should go here
const jwt = require('jsonwebtoken')
const User = require('../../models/User')
const router = require('express').Router()

// Setup API routes
router.post('/register', (req, res) => {
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

router.post('/login', (req, res) => {
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



router.get('/logout', (req, res) => {
    req.logout()
    res.status(200).send('Successfully logged out!')
});

module.exports = router