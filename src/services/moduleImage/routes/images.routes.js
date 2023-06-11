const Router = require('../../../core/router/router')
const {Utils,JwtMiddleware, MulterMiddleware, FileUpLoader} = require('../../../utils')
const {ImageController} = require('../controller')
const path = require('path') 
const express = require('express')

const uploadPathTmp = path.join(process.env.UPLOAD_TMP_PATH)
const uploadImagePath = path.join(process.env.UPLOAD_IMG_PATH)
const uploadSongPath = path.join(process.env.UPLOAD_SONG_PATH)
const uploadVideoPath = path.join(process.env.UPLOAD_VIDEO_PATH)

const uploaderImg = new FileUpLoader(['image/jpeg', 'image/png'], 5, uploadPathTmp)

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
                    result = await ImageController.saveImageMultiple(Img)
                }
            return Utils.apiResponse(res, Promise.resolve({status: 200, message: "Tous c'est bien passe",error: false, data: result.data}))
        })

        this.app.post(
            '/test2/image',
            uploaderImg.handleUpload,
            (req, res)=>{
                console.log(req.files);
                res.send('Files uploaded!')
            }
        )

        this.app.use(
            '/src/assets/images',
            express.static(path.join(__dirname,"..","..","..","assets","images"))
        )
    }
}
module.exports = ImageRoutes
