const AppError = require("../utils/AppError")

class UsersController{
    create(request, response){
        const { name, email, password } = request.body

        if (!name || !email || !password){
            throw new AppError("Preencha os campos obrigatório!")
        }

        response.status(201).json({ name, email, password })
    }

}

module.exports = UsersController