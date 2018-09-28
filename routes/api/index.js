const router = require("express").Router()
const sampleRoutes = require("./samples")
const authRoutes = require("./auth")

// Samples routes
router.use("/samples", sampleRoutes)
router.use("/auth", authRoutes)

module.exports = router
