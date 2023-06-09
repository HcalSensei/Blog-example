const Router = require('../../../core/router/router')
const {Utils} = require('../../../utils')
const {categorieController} = require('../http/controller')
const {CategorieMiddleware} = require('../http/middleware')
const {JwtMiddleware} = require('../../../utils')

class CategorieRoutes extends Router{
    constructor(app){
        super(app)
    }

    getRoutes(){
        this.app.get('/test/categorie', 
            (_req, res)=>{

            return Utils.apiResponse(res, categorieController.create({
                categorieLibelle: "test"
            }))
        })

        this.app.post(
            '/categorie/add',
            JwtMiddleware.checkAuth,
            CategorieMiddleware.register(),
            CategorieMiddleware.verifyLibelleCategorie,
            (req, res)=>{
                const data = req.body
                return Utils.apiResponse(res, categorieController.create(data))
            }
        )

        this.app.get(
            '/categorie/all',
            JwtMiddleware.checkAuth,
            (req, res)=>{
                return Utils.apiResponse(res, categorieController.getActivatedCategorie())
            }
        )

        this.app.get(
            '/categorie/all-no',
            JwtMiddleware.checkAuth,
            (req, res)=>{
                return Utils.apiResponse(res, categorieController.getAllCategorie())
            }
        )

        this.app.get(
            '/categorie/get/:id',
            JwtMiddleware.checkAuth,
            CategorieMiddleware.verifyIdCategorie,
            (req, res)=>{
                const categorieId = req.params.id
                return Utils.apiResponse(res, categorieController.getOneCategorie(categorieId))
            }
        )

        this.app.post(
            '/categorie/update/:id',
            JwtMiddleware.checkAuth,
            CategorieMiddleware.verifyIdCategorie,
            CategorieMiddleware.verifyLibelleCategorie,
            (req, res)=>{
                const categorieId = req.params.id
                const data = req.body
                return Utils.apiResponse(res, categorieController.update(data,categorieId))
            }
        )

        this.app.get(
            '/categorie/delete/:id',
            JwtMiddleware.checkAuth,
            CategorieMiddleware.verifyIdCategorie,
            (req, res)=>{
                const categorieId = req.params.id
                return Utils.apiResponse(res, categorieController.delete(categorieId))
            }
        )
    }
}
module.exports = CategorieRoutes
