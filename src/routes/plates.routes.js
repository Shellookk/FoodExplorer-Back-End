const { Router } = require("express")
const multer = require("multer")
const PlatesController = require("../controllers/PlatesController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")
const uploadConfig = require("../configs/upload")


const platesRoutes = Router()
const platesController = new PlatesController()
const upload = multer(uploadConfig.MULTER)
platesRoutes.use(ensureAuthenticated)


platesRoutes.post("/", verifyUserAuthorization(["admin"]), platesController.create)
platesRoutes.post("/", verifyUserAuthorization(["admin"]), platesController.update)
platesRoutes.patch("/avatar", verifyUserAuthorization(["admin"]), upload.single("avatar"), userAvatarController.update)

module.exports = platesRoutes