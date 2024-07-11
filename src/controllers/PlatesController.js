const knex = require("knex")
const { select } = require("../database/knex")
class PlatesController{
    async create(request, response){
        const { name, avatar, category, price, description, ingredients } = request.body
        
        if (!name || !category || !price || !description){
            throw new AppError("Preencha os campos obrigatório!")
        }
        
        const [plat_id] = await knex("plates").insert({
            name,
            avatar,
            category,
            price,
            description,
        })

        const ingredientsInsert = ingredients.map(name =>{
            return{
                name : name
            }
        })

        const [ingredients_id] = await knex("ingredients").insert(ingredientsInsert)

        await knex("ingredients_plate").insert({
            plat_id,
            ingredients_id
        })

        return response.status(201).json()
    }

    async update(request, response){
        const { name, avatar, category, price, description, ingredients } = request.body
        const plate_id = request.plate.id
        const plate = await knex('plates').where('id', plate_id)

        if(!plate){
            throw new AppError("Produto não encontrado!")
        }

        plate.name = name ?? plate.name
        plate.avatar = name ?? plate.avatar
        plate.category = name ?? plate.category
        plate.price = name ?? plate.price
        plate.description = name ?? plate.description
        plate.ingredients = name ?? plate.ingredients

        await knex.insert({
            name,
            avatar,
            category,
            price,
            description,
            ingredients
        })

        return response.status(200).json()
    }
}

module.exports = PlatesController