const { Router } = require("express")
const PlatesController = require("../controllers/PlatesController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")
const platesRoutes = Router()
const platesController = new PlatesController()

platesRoutes.use(ensureAuthenticated)

platesRoutes.post("/", verifyUserAuthorization(["admin"]), platesController.create)

module.exports = platesRoutes