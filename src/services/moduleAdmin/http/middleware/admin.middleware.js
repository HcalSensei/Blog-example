const { body } = require('express-validator');
const {mysqlHelper} = require('../../../../core/db')
const {query} = require('../../../model')
const {Utils} = require('../../../../utils')

class AdminMiddleware{
    static register(){
        return[
            body('adminNom').not().isEmpty().withMessage('veuillez entrer un nom'),
            body('adminTypego').not().isEmpty().withMessage('veuillez entrer le type d\'administrateur'),
            body('adminEmail').isEmail().withMessage('veuillez entrer un email'),
            body('niveauAcces').not().isEmpty().withMessage('veuillez entrer le niveau de l\'administrateur'),
            body('adminMotDePasse').isLength({min: 4}).withMessage('votre mot de passe doit faire au moins 4 caractère'),
            body('adminMotDePasse').isLength({max: 10}).withMessage('votre mot de passe doit faire au plus 10 caractère'),
            body('adminMotDePasse').not().isEmpty().withMessage('veuillez entrer un mot de passe'),
            body('confirmMotDePasse').custom((value, { req }) => {
                return (value !== req.body.utilisateurMotDePasse)? false: true
            }).withMessage('les mots de passes ne correspondent pas'),
            
        ]
    }

    static async verifyAdminMail(req, res, next){
        const connexion = mysqlHelper.connect()
        let getAdmin = req.body.adminEmail
        
        if(!getAdmin)
            return Utils.apiResponse(res, Promise.resolve({
                status: 422,
                message: "Erreur de parametres",
                data: null,
                error: true
            }))

        const sql = 'SELECT adminID FROM admin WHERE adminEmail = ?';
        const oneAdmin = await query(connexion, sql,[getAdmin])
        connexion.end()
        if(oneAdmin.data.length!=0)
            return Utils.apiResponse(res, Promise.resolve({
                status: 422,
                message: "L'administrateur exist déja",
                data: null,
                error: true
            }))
        
        next()
    }

    static async verifyAdminMailTrue(req, res, next){
        const connexion = mysqlHelper.connect()
        let getAdmin = req.body.adminEmail
        
        if(!getAdmin)
            return Utils.apiResponse(res, Promise.resolve({
                status: 422,
                message: "Email vide",
                data: null,
                error: true
            }))

        const sql = 'SELECT adminID FROM admin WHERE adminEmail = ?';
        const oneAdmin = await query(connexion, sql,[getAdmin])
        connexion.end()
        if(oneAdmin.data.length==0)
            return Utils.apiResponse(res, Promise.resolve({
                status: 422,
                message: "L'administrateur n'exist pas",
                data: null,
                error: true
            }))
        
        next()
    }

    static async verifyAdminTelephone(req, res, next){
        const connexion = mysqlHelper.getInstance()
        let getAdmin = req.body.adminEmail

        if(!getAdmin || getAdmin ==':id')
            return Utils.apiResponse(res, Promise.resolve({
                status: 422,
                message: "Erreur de parametres",
                data: null,
                error: true
            }))

        const sql = 'SELECT adminID FROM admin WHERE adminID = ?';
        const oneAdmin = await query(connexion, sql,[getAdmin])
        if(oneAdmin)
            return Utils.apiResponse(res, Promise.resolve({
                status: 422,
                message: "L'administrateur exist déja",
                data: null,
                error: true
            }))
        
        next()
    }
}
module.exports = AdminMiddleware
