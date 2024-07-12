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
        const { name, category, price, description, ingredients } = request.body
        const { id } = request.params
        const plate = await knex('plates').where({ id }).first()
        const Searchingredient = await knex('ingredients_plate as ip')
        .innerJoin('plates as p', 'p.id', 'ip.plate_id')
        .innerJoin('ingredients as i', 'i.id', 'ip.ingredient_id')
        .select('i.name as ingredient_name')
        .where('p.id', id)

        const existingIngredients = Searchingredient.map(ingredient => ingredient.ingredient_name)

        if (ingredients.length > 0) {
            const uniqueIngredients = ingredients.filter(ingredient => !existingIngredients.includes(ingredient))
            console.log(uniqueIngredients);
        }

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
    
        await knex('plates').where({ id }).update(updatedPlate)
    
        return response.status(200).json(updatedPlate)
    }

    async delete(){

    }

    async index(){

    }

    async show(){

    }
}

module.exports = PlatesController