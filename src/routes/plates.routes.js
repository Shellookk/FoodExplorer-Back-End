const { Router } = require("express")
const multer = require("multer")
const PlateAvatarController = require("../controllers/PlateAvatarController")
const PlatesController = require("../controllers/PlatesController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")
const uploadConfig = require("../configs/upload")

const platesRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const platesController = new PlatesController()
const plateAvatarController = new PlateAvatarController()

platesRoutes.use(ensureAuthenticated)


platesRoutes.post("/", verifyUserAuthorization(["admin"]), platesController.create)
platesRoutes.put("/", verifyUserAuthorization(["admin"]), platesController.update)
platesRoutes.patch("/avatar", verifyUserAuthorization(["admin"]), upload.single("avatar"), plateAvatarController.update)

module.exports = platesRoutes