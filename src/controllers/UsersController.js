const { hash, compare } = require("bcryptjs")
const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")

class UsersController{
    async create(request, response){
        const { name, email, password } = request.body
        const database = await sqliteConnection()
        const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

        if (!name || !email || !password){
            throw new AppError("Preencha os campos obrigatório!")
        }

        if(checkUserExists){
            throw new AppError("Este e-mail já está em uso!")
        }

        const hashedPassword = await hash(password, 8)
        
        await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)" [name, email, hashedPassword])


        response.status(201).json({ name, email, password })
    }

    async update(request, response){
        const { name, email, password, oldpassword } = request.body
        const { id } = request.params

        const database = await sqliteConnection()
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

        if(!user){
            throw new AppError("Usuário não encontrado!")
        }

        const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])

        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
            throw new AppError("Este e-mail já está em uso!")
        }

        user.name = name ?? user.name
        user.email = email ?? user.email

        if(password && !oldpassword){
            throw new AppError("Você precisa informar a senha antiga para definir a nova senha!")
        }
        if(password && password){
            const checkOldPassword = await compare(oldpassword, user.password)

            if(!checkOldPassword) {
                throw new AppError("A senha antiga não confere.")
              }

              user.password = await hash(password, 8)
        }

        await database.run(`
            UPADATE users SET
            name = ?,
            email = ?,
            password = ?,
            updated_at = DATETIME('now'),
            WHERE id = ?`,
            [user.name, user.email,user.password, id]
        )

        return response.status(200).json()
    }
}

module.exports = UsersController