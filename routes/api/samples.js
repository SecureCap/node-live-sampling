const router = require('express').Router()
const sampleController = require('../../controllers/sampleController')
const passport = require('../../config/passport')

// Matches with "/api/articles"
router.route("/")
  .get(sampleController.findAll)
  .post(sampleController.create)

// Matches with "/api/articles/:id"
// router
//   .route("/:id")
//   .get(sampleController.findById)
//   .put(sampleController.update)
//   .delete(sampleController.remove)

// Our private route that we want to protect (i.e. profile pages)
router.get('/private', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({accessible: true})
})

module.exports = router
