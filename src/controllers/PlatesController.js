const knex = require('../database/knex');
const AppError = require("../utils/AppError")

class PlatesController{
    async create(request, response){
        const { name, avatar, category, price, description, ingredients } = request.body;

        // Verifica se os campos obrigatórios estão presentes
        if (!name || !price || !description) {
            throw new AppError("Preencha os campos obrigatórios!");
        }
        
        // Transforma os dados em caixa baixa
        const lowerCaseData = {
            name: name.toLowerCase(),
            avatar: avatar.toLowerCase(),
            category: category.toLowerCase(),
            price: price,
            description: description.toLowerCase()
        };
        
        // Insere os dados na tabela plates
        const [plate_id] = await knex("plates").insert(lowerCaseData);
        
        // Verifica se o array de ingredientes não está vazio
        if (ingredients && ingredients.length > 0) {
            // Transforma os ingredientes em caixa baixa
            const ingredientsInsert = ingredients.map(name => ({
                name: name.toLowerCase()
            }));
        
            const ingredients_ids = await knex("ingredients").insert(ingredientsInsert).returning("id");
        
            const ingredientsPlateInsert = ingredients_ids.map(ingredient => ({
                plate_id,
                ingredient_id: ingredient.id // Corrige o acesso ao id do ingrediente
            }));
        
            await knex("ingredients_plate").insert(ingredientsPlateInsert);
        }
        
        return response.status(201).json({ plate_id, ingredients });
    }        

    async update(request, response) {
        const { name, category, price, description, ingredients } = request.body;
        const { id } = request.params;
    
        if (!id) {
            throw new AppError("ID do prato não fornecido!", 400);
        }
    
        const plate = await knex('plates').where({ id }).first();
    
        if (!plate) {
            throw new AppError("Produto não encontrado!", 400);
        }
    
        const updatedPlate = {
            name: name ? name.toLowerCase() : plate.name,
            category: category ? category.toLowerCase() : plate.category,
            price: price ?? plate.price,
            description: description ? description.toLowerCase() : plate.description,
            updated_at: new Date()
        };
    
        await knex('plates').where({ id }).update(updatedPlate);
    
        // Atualização dos ingredientes
        const existingIngredients = await knex('ingredients_plate as ip')
            .innerJoin('plates as p', 'p.id', 'ip.plate_id')
            .innerJoin('ingredients as i', 'i.id', 'ip.ingredient_id')
            .select('i.name as ingredient_name')
            .where('p.id', id)            
    
        if (ingredients && ingredients.length > 0) {
            // Ingredientes únicos que não estão na lista existente
            const uniqueIngredients = ingredients.filter(ingredient => !existingIngredients.includes(ingredient.toLowerCase()));
    
            if (uniqueIngredients.length > 0) {
                // Transformar os ingredientes para caixa baixa
                const ingredientsInsert = uniqueIngredients.map(name => ({
                    name: name.toLowerCase()
                }));
    
                const ingredients_ids = await knex("ingredients").insert(ingredientsInsert).returning("id");
    
                const ingredientsPlateInsert = ingredients_ids.map(ingredient => ({
                    plate_id: id,
                    ingredient_id: ingredient.id
                }));
    
                await knex("ingredients_plate").insert(ingredientsPlateInsert);
            }            
            // Remove ingredientes que não estão mais associados ao prato
            const ingredientsToRemove = existingIngredients.filter(ingredient => !ingredients.includes(ingredient.toLowerCase()));
            if (ingredientsToRemove.length > 0) {
                await knex('ingredients_plate')
                    .whereIn('ingredient_id', function() {
                        this.select('id')
                            .from('ingredients')
                            .whereIn('name', ingredientsToRemove);
                    })
                    .andWhere('plate_id', id)
                    .del();
            }
        }
    
        return response.status(200).json(updatedPlate);
    }    
    //Remover pratos
    async delete(){

    }
    //mostrar todos os pratos
    async index(request, response){
        const { id, name, category, price, description, ingredients, avatar } = request.body;

        return response.status(201).json({ });

    }
    // visualizar somente um prato
    async show(request, response){
        const { name, category, price, description, ingredients, avatar } = request.body;
        const { id } = request.params; 



        return response.status(201).json({ });
    }
}

module.exports = PlatesController