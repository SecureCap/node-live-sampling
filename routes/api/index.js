const router = require("express").Router()
const sampleRoutes = require("./samples")
const userRoutes = require("./users")

// Samples routes
router.use("/samples", sampleRoutes)
router.use("/users", userRoutes)

module.exports = router
