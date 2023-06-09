const Router = require('../../../core/router/router')
const {JwtMiddleware, MulterMiddleware, Utils} = require('../../../utils')
const {postController} = require('../http/controller')
const {PostMiddleware} = require('../http/middleware')

class PostRoutes extends Router{
    constructor(app){
        super(app)
    }

    getRoutes(){
        this.app.get(
            '/test/post',
            JwtMiddleware.checkAuth, 
            (req, res)=>{
            const admin = req.authToken.adminID 
            return Utils.apiResponse(res, postController.create({
                postTitre: "test en dev",
                postTheme: "test",
                postContenu: "Ceci est le premier test en dev.\n Effectuer directement en code\n Ne pas prendre en compte.",
                auteurId: admin,
                postMedia: null,
                postCategorieId: 1,
                typePost: 1
            }))
        })

        this.app.post(
            '/post/register',
            JwtMiddleware.checkAuth,
            PostMiddleware.register(),
            PostMiddleware.verifyTitrePost,
            (req, res)=>{
                const admin = req.authToken.adminID 
                const data = req.body

                data.auteurId = admin
                return Utils.apiResponse(res, postController.create(data))
            }
        )

        this.app.get(
            '/post/all',
            JwtMiddleware.checkAuth,
            (req, res)=>{
                const admin = req.authToken.adminID 
                return Utils.apiResponse(res, postController.getActivatedPost())
            }
        )

        this.app.get(
            '/post/all-no',
            JwtMiddleware.checkAuth,
            (req, res)=>{
                const admin = req.authToken.adminID 
                return Utils.apiResponse(res, postController.getAllPost())
            }
        )

        this.app.get(
            '/post/get/:id',
            JwtMiddleware.checkAuth,
            (req, res)=>{
                const admin = req.authToken.adminID 
                const postId = req.params.id
                return Utils.apiResponse(res, postController.getOnePost(postId))
            }
        )
    }
}
module.exports = PostRoutes