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


platesRoutes.post("/", verifyUserAuthorization(["admin"]), platesController.create) // Criar pratos
platesRoutes.get("/", verifyUserAuthorization(["admin", "customer"]) , platesController.index) // Visualizar todos os pratos
platesRoutes.put("/:id", verifyUserAuthorization(["admin"]), platesController.update) // Atualizar prato
platesRoutes.delete("/:id", verifyUserAuthorization(["admin"]), platesController.delete) // Deletar prato
platesRoutes.patch("/:id/avatar", verifyUserAuthorization(["admin"]), upload.single("avatar"), plateAvatarController.update) // Atualizar foto
platesRoutes.get("/:id", verifyUserAuthorization(["admin", "customer"]) , platesController.show) // Mostrar somente um prato
module.exports = platesRoutes