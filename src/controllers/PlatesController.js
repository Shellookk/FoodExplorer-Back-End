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

        return response.status(201).json({name, avatar, category, price, description, ingredients})
    }

    async update(request, response) {
        const { name, category, price, description } = request.body
        const { id } = request.params
        const plate = await knex('plates').where({ id }).first()
    
        if (!id) {
            throw new AppError("ID do prato não fornecido!", 400);
        }
        if (!plate) {
            throw new AppError("Produto não encontrado!", 400)
        }
    
        const updatedPlate = {
            name: name ?? plate.name,
            category: category ?? plate.category,
            price: price ?? plate.price,
            description: description ?? plate.description,
            updated_at: new Date()
        };
    
        await knex('plates').where({ id }).update(updatedPlate);
    
        return response.status(200).json(updatedPlate);
    }
    
}

module.exports = PlatesController