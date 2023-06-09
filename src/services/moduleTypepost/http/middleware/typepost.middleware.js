const { body } = require('express-validator');
const {mysqlHelper} = require('../../../../core/db')
const {query} = require('../../../model')
const {Utils} = require('../../../../utils')

class TypepostMiddleware{
    static register(){
        return[
            body('typepostLibelle').not().isEmpty().withMessage('veuillez entrer le libelle')
        ]
    }

    static async verifyLibelleTypepost(req, res, next){
        const connexion = mysqlHelper.connect()
        let getTypepost = req.body.typepostLibelle
        if(!getTypepost)
            return Utils.apiResponse(res, Promise.resolve({
                status: 422,
                message: "Erreur de champs",
                data: null,
                error: true
            }))
        const sql = 'SELECT typepostLibelle FROM type_post WHERE typePostId = ?';
        const oneTypepost = await query(connexion, sql,[getTypepost])
        connexion.end()
        if(oneTypepost.data.length!=0)
            return Utils.apiResponse(res, Promise.resolve({
                status: 422,
                message: "Le type post n'exist pas",
                data: null,
                error: true
            }))
        
        next()
    }

    static async verifyLibelleTypepostExiste(req, res, next){
        const connexion = mysqlHelper.connect()
        let getTypepost = req.body.typepostLibelle
        if(!getTypepost)
            return Utils.apiResponse(res, Promise.resolve({
                status: 422,
                message: "Erreur de champs",
                data: null,
                error: true
            }))
        const sql = 'SELECT typepostLibelle FROM type_post WHERE typePostId = ?';
        const oneTypepost = await query(connexion, sql,[getTypepost])
        connexion.end()
        if(oneTypepost.data.length!=0)
            return Utils.apiResponse(res, Promise.resolve({
                status: 422,
                message: "Le type post exist déja",
                data: null,
                error: true
            }))
        
        next()
    }

    static async verifyIdTypepost(req, res, next){
        const connexion = mysqlHelper.connect()
        let getTypepost = req.params.id
        if(!getTypepost || getTypepost ==':id')
            return Utils.apiResponse(res, Promise.resolve({
                status: 422,
                message: "Erreur de parametres",
                data: null,
                error: true
            }))
        const sql = 'SELECT typepostLibelle FROM type_post WHERE typepostLibelle = ?';
        const oneTypepost = await query(connexion, sql,[getTypepost])
        connexion.end()
        if(oneTypepost.data.length!=0)
            return Utils.apiResponse(res, Promise.resolve({
                status: 422,
                message: "Le type post exist déja",
                data: null,
                error: true
            }))
        
        next()
    }
}
module.exports = TypepostMiddleware
