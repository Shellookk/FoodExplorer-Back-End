class PlatesController{
    async create(request, response){
        const database = await sqliteConnection()
        const { name, avatar, category, price, description, ingredients } = request.body

        if (!name || !category || !price || !description){
            throw new AppError("Preencha os campos obrigatório!")
        }

        await database.run("INSERT INTO plates (name, avatar, category, price, description) VALUES (lower(?), ?, ?, ?, lower(?))", [name, avatar, category, price, description])

        return response.status(201).json()
    }

    async update(request, response){
        const { name, email, password, oldpassword } = request.body
        const user_id = request.user.id
        const database = await sqliteConnection()
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]);

        return response.status(200).json()
    }
}

module.exports = PlatesController