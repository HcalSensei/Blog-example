const Router = require('../../../core/router/router')
const {Utils} = require('../../../utils')
const {typepostController} = require('../http/controller')
const {TypepostMiddleware} =require('../http/middleware')
const {JwtMiddleware} = require('../../../utils')

class TypepostRoutes extends Router{
    constructor(app){
        super(app)
    }

    getRoutes(){
        this.app.get('/test/type-post', 
        (_req, res)=>{

            return Utils.apiResponse(res, typepostController.create({
                typepostLibelle: "test"
            }))
        })

        this.app.get(
            '/type-post/all',
            JwtMiddleware.checkAuth,
            (req, res)=>{
                return Utils.apiResponse(res, typepostController.getAllTypepost())
            }
        )

        this.app.get(
            '/type-post/list',
            JwtMiddleware.checkAuth,
            (req, res)=>{
                return Utils.apiResponse(res, typepostController.getTypepost())
            }
        )

        this.app.post(
            '/type-post/register',
            JwtMiddleware.checkAuth,
            TypepostMiddleware.verifyLibelleTypepost,
            (req, res)=>{
                const data = req.body
                return Utils.apiResponse(res, typepostController.create(data))
            }
        )

        this.app.get(
            '/type-post/get/:id',
            JwtMiddleware.checkAuth,
            TypepostMiddleware.verifyIdTypepost,
            (req, res)=>{
                const data = req.params.id
                return Utils.apiResponse(res, typepostController.getOneTypepost(data))
            }
        )

        this.app.get(
            '/type-post/delete/:id',
            JwtMiddleware.checkAuth,
            TypepostMiddleware.verifyIdTypepost,
            (req, res)=>{
                const data = req.params.id
                return Utils.apiResponse(res, typepostController.deleteOneTypepost(data))
            }
        )

        this.app.post(
            '/type-post/update/:id',
            JwtMiddleware.checkAuth,
            TypepostMiddleware.verifyIdTypepost,
            TypepostMiddleware.verifyLibelleTypepostExiste,
            (req, res)=>{
                const typepostId = req.params.id
                const data = req.body
                return Utils.apiResponse(res, typepostController.update(data, typepostId))
            }
        )
    }
}
module.exports=TypepostRoutes
