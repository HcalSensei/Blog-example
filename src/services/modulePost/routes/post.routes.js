const Router = require('../../../core/router/router')
const {JwtMiddleware, MulterMiddleware, Utils} = require('../../../utils')
const {postController} = require('../http/controller')
const {PostMiddleware} = require('../http/middleware')
const {ImageController} = require('../../moduleImage/controller')

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
            MulterMiddleware.multipleImage,
            async (req, res)=>{
                const admin = req.authToken.adminID 
                const data = req.body
                const Img = req.files ? req.files: []
                if(Img.length!==0){
                    result = await ImageController.saveImageMultiple(Img)
                }

                data.auteurId = admin
                data.postMedia =result.data
                return Utils.apiResponse(res, postController.create(data))
            }
        )

        this.app.post(
            '/post/update/:id',
            JwtMiddleware.checkAuth,
            PostMiddleware.verifyIdPost,
            MulterMiddleware.multipleImage,
            async (req, res)=>{
                const admin = req.authToken.adminID 
                const data = req.body
                const postId = req.params.id
                if(Img.length!==0){
                    result = await ImageController.saveImageMultiple(Img)
                }

                data.auteurId = admin
                data.postMedia =result.data
                return Utils.apiResponse(res, postController.update(data))
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