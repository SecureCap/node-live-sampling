const router = require('express').Router()
const sampleController = require('../../controllers/sampleController')

router.route("/")
  .get(sampleController.findAll)
  .post(sampleController.create)

router
  .route("/:id")
  .get(sampleController.findById)
  .put(sampleController.update)
  .delete(sampleController.remove)


module.exports = router
