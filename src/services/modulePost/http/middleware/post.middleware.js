const { body } = require('express-validator');
const {mysqlHelper} = require('../../../../core/db')
const {query} = require('../../../model')
const {Utils} = require('../../../../utils')

class PostMiddleware{
    static register(){
        return[
            body('postTitre').not().isEmpty().withMessage('veuillez entrer le titre du post'),
            body('postTheme').not().isEmpty().withMessage('veuillez entrer le thème du post'),
            body('postContenu').not().isEmpty().withMessage('veuillez entrer le contenu textuelle du post'),
            body('auteurId').not().isEmpty().withMessage('veuillez entrer l\'identifant de l\'auteur du post'),
            body('postCategorieId').not().isEmpty().withMessage('veuillez entrer l\'identifant de la catégorie du post'),
            body('typePost').not().isEmpty().withMessage('veuillez entrer l\'identifant du type du post'),
        ]
    }

    static async verifyTitrePost(req, res, next){
        const connexion = mysqlHelper.connect()
        let getPost = req.body.postTitre
        if(!getPost || getPost==':id')
            return Utils.apiResponse(res, Promise.resolve({
                status: 422,
                message: "Erreur de champs",
                data: null,
                error: true
            }))
        
        const sql = 'SELECT postId FROM post WHERE postTitre = ?';
        const onePost = await query(connexion, sql,[getPost])
        connexion.end()

        if(onePost.data.length!=0)
            return Utils.apiResponse(res, Promise.resolve({
                status: 422,
                message: "La categorie exist déja",
                data: onePost.data,
                error: true
            }))

        next()
    }

    static async verifyIdPost(req, res, next){
        const connexion = mysqlHelper.connect()
        let getPost = req.params.id

        if(!getPost|| getPost==':id')
            return Utils.apiResponse(res, Promise.resolve({
                status: 422,
                message: "Erreur de parametre",
                data: null,
                error: true
            }))
        
        const sql = 'SELECT postId FROM post WHERE postId = ?';
        const onePost = await query(connexion, sql,[getPost])
        connexion.end()

        if(onePost.data.length!=0)
            return Utils.apiResponse(res, Promise.resolve({
                status: 422,
                message: "La categorie exist déja",
                data: onePost.data,
                error: true
            }))
        
        next()
    }
}
module.exports = PostMiddleware