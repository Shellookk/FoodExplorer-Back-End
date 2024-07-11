const knex = require('../database/knex');
const AppError = require("../utils/AppError")
class PlatesController{
    async create(request, response){
        const { name, avatar, category, price, description, ingredients } = request.body
        
        if (!name || !price || !description){
            throw new AppError("Preencha os campos obrigatório!")
        }
        
        const [plate_id] = await knex("plates").insert({
            name,
            avatar,
            category,
            price,
            description
        })

        const ingredientsInsert = ingredients.map(name =>{
            return{
                name : name,
            }
        });

        const ingredients_ids = await knex("ingredients").insert(ingredientsInsert).returning("id");


        const ingredientsPlateInsert = ingredients_ids.map(ingredient_id => ({
        
            plate_id,
            ingredient_id: ingredient_id.id    
        }))

        await knex("ingredients_plate").insert(ingredientsPlateInsert)

        return response.status(201).json({ingredientsPlateInsert})
    }

    async update(request, response){
        const { name, avatar, category, price, description, ingredients } = request.body
        const plate_id = request.plate.id
        const plate = await knex('plates').where({plate_id}).first()

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