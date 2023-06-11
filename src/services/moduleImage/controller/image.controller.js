const {MulterMiddleware} = require('../../../utils')


class ImageController{

    static async saveImageMultiple(pathFile){
        return new Promise(async (resolve, reject)=>{
            try {
                let saveFilePath = await MulterMiddleware.saveMultipleImage(pathFile, MulterMiddleware.uploadImagePath)

                let results = []
                for(let onePath of saveFilePath.data){
                    results.push(onePath)
                }
                return resolve({
                    error: false,
                    status: 201,
                    message: "Tous c'est bien passe",
                    data: results
                })
            } catch (error) {
                console.warn(error);
                return reject({
                    error: true,
                    status: 500,
                    message: "Erreur d'envoi du fichier💀☠💀",
                    data: error.message
                })
            }
        })
    }
}

module.exports = ImageController