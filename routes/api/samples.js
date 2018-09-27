const router = require('express').Router()
const sampleController = require('../../controllers/sampleController')

// Matches with "/api/articles"
router.route("/")
  .get(sampleController.findAll)
  .post(sampleController.create)

// Matches with "/api/articles/:id"
router
  .route("/:id")
  .get(sampleController.findById)
  .put(sampleController.update)
  .delete(sampleController.remove)

module.exports = router
