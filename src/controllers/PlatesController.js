class PlatesController{
    async create(request, response){
        const { name, avatar, category, price, description } = request.body
        const database = await sqliteConnection()
        const checkIngredientExists = await database.get("SELECT * FROM ingredients WHERE lower(email) = lower(?)", [email])


        await database.run()

        return response.status(201).json()
    }


}

module.exports = PlatesController