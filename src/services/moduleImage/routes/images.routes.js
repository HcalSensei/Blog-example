const Router = require('../../../core/router/router')
const {Utils,JwtMiddleware, MulterMiddleware} = require('../../../utils')
const {ImageController} = require('../controller')

class ImageRoutes extends Router{
    constructor(app){
        super(app)
    }

    getRoutes(){
        this.app.post(
            '/test/images', 
            MulterMiddleware.multipleImage,
            async (req, res)=>{
                const Img = req.files ? req.files: []
                let result = []

                if(Img.length!==0){
                    result = await ImageController.saveMultipleImage(Img)
                }
                console.log(result)
            return Utils.apiResponse(res, Promise.resolve({status: 200, error: false, data: result}))
        })
    }
}
module.exports = ImageRoutes
