const { Router } = require("express")
const PlatesController = require("../controllers/PlatesController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const platesRoutes = Router()
const platesController = new PlatesController()

platesRoutes.use(ensureAuthenticated)

platesRoutes.post("/", platesController.create)

module.exports = platesRoutes