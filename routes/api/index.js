const router = require("express").Router()
const passport = require('../../config/passport')
const sampleRoutes = require("./samples")
const authRoutes = require("./auth")

// Samples routes
router.use("/samples", passport.authenticate('jwt', { session: false }), sampleRoutes)
router.use("/auth", authRoutes)

module.exports = router
