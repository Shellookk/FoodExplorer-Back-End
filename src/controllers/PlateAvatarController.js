const knex = require('knex')
const AppError = require('../utils/AppError')
const DiskStorage = require('../providers/DiskStorage')

class PlateAvatarController{
    async update(request, response){
        const plate_id = request.plate.id
        const avatarFilename = request.file.filename

        const diskStorage = new DiskStorage()
        
        const plate = await knex("plates")
            .where({ id: plate_id}).first()

        if(!plate){
            throw new AppError("Somente usuários autenticados podem mudar o avatar do prato", 401)
        }

        if(plate.avatar){
            await diskStorage.deleteFile(plate.avatar)
        }

        const filename = await diskStorage.saveFile(avatarFilename)
        plate.avatar = filename
            
        await knex("plates").update(plate).where({ id: plate_id })

        return response.json(plate)
    }
}

module.exports = PlateAvatarController;