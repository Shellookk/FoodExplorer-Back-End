const { Router } = require("express")

const usersRoutes = require("./users.routes")
const platesRoutes = require("./plates.routes")
const sessionsRoutes = require("./sessions.routes")

const routes = Router()

routes.use("/sessions", sessionsRoutes)
routes.use("/users", usersRoutes)
routes.use("/plates", platesRoutes)



module.exports = routes