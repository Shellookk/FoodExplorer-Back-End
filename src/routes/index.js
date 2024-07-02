const { Router } = require("express")

const usersRouts = require("./users.routes")

const routes = Router()

routes.use("/users", usersRouts)

module.exports = routes