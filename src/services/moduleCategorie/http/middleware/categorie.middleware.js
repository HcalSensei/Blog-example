const { body } = require('express-validator');
const {mysqlHelper} = require('../../../../core/db')
const {query} = require('../../../model')
const {Utils} = require('../../../../utils')

class CategorieMiddleware{
    static register(){
        return[
            body('categorieLibelle').not().isEmpty().withMessage('veuillez entrer le libelle')
        ]
    }

    static async verifyLibelleCategorie(req, res, next){
        const connexion = mysqlHelper.connect()
        let getCategorie = req.body.categorieLibelle
        if(!getCategorie)
            return Utils.apiResponse(res, Promise.resolve({
                status: 422,
                message: "Erreur de champs",
                data: null,
                error: true
            }))

        const sql = 'SELECT categorieLibelle FROM categorie WHERE categorieLibelle = ?';
        const oneCategorie = await query(connexion, sql,[getCategorie])
        connexion.end()

        if(oneCategorie.data.length!=0)
            return Utils.apiResponse(res, Promise.resolve({
                status: 422,
                message: "La categorie exist déja",
                data: oneCategorie.data,
                error: true
            }))
        
        next()
    }

    static async verifyIdCategorie(req, res, next){
        const connexion = mysqlHelper.connect()
        let getCategorie = req.params.id
        if(!getCategorie || getCategorie==':id')
            return Utils.apiResponse(res, Promise.resolve({
                status: 422,
                message: "Erreur de paramètre",
                data: null,
                error: true
            }))

        const sql = 'SELECT categorieLibelle FROM categorie WHERE categorieId = ?';
        const oneCategorie = await query(connexion, sql,[getCategorie])
        connexion.end()

        if(oneCategorie.data.length==0)
            return Utils.apiResponse(res, Promise.resolve({
                status: 422,
                message: "La categorie n'exist pas",
                data: oneCategorie.data,
                error: true
            }))
        
        next()
    }
}
module.exports = CategorieMiddleware