const { body } = require('express-validator');
const {mysqlHelper} = require('../../../../core/db')
const {query} = require('../../../model')
const {Utils} = require('../../../../utils')


class UtilisateurMiddleware{
    static register(){
        return[
            body('utilisateurNom').not().isEmpty().withMessage('veuillez entrer un nom'),
            body('utilisateurPrenom').not().isEmpty().withMessage('veuillez entrer un prenom'),
            body('utilisateurEmail').isEmail().withMessage('veuillez entrer un email'),
            body('utilisateurTelephone').not().isEmpty().withMessage('veuillez entrer un numéro de téléphone'),
            body('utilisateurMotDePasse').isLength({min: 4}).withMessage('votre mot de passe doit faire au moins 4 caractère'),
            body('utilisateurMotDePasse').isLength({max: 10}).withMessage('votre mot de passe doit faire au plus 10 caractère'),
            body('utilisateurMotDePasse').not().isEmpty().withMessage('veuillez entrer un mot de passe'),
            body('confirmMotDePasse').custom((value, { req }) => {
                return (value !== req.body.utilisateurMotDePasse)? false: true
            }).withMessage('les mots de passes ne correspondent pas'),
            
        ]
    }

    static async verifyUtilisateurByMail(req, res, next){
        const connexion = mysqlHelper.connect()
        let newUtilisateur = req.body.utilisateurEmail
        if(!newUtilisateur)
            return Utils.apiResponse(res, Promise.resolve({
                status: 422,
                message: "Veuillez renseigner le champs: utilisateurEmail",
                data: null,
                error: true
            }))
        
        const sql = 'SELECT utilisateurId FROM utilisateur WHERE utilisateurEmail = ?';
        const oneUtilisateur = await query(connexion, sql, [newUtilisateur]);
        connexion.end()

        if(!oneUtilisateur.data.length ==0)
            return Utils.apiResponse(res, Promise.resolve({
                status: 422,
                message: "Le utilisateur exist déja",
                data: null,
                error: true
            }))

        next()
    }

    static async verifyUtilisateurById(req, res, next){
        const connexion = mysqlHelper.connect()
        let getUtilisateur = req.params.id
        if(!getUtilisateur || getUtilisateur ==':id')
            return Utils.apiResponse(res, Promise.resolve({
                status: 422,
                message: "Erreur de parametres",
                data: null,
                error: true
            }))
        
        const sql = 'SELECT utilisateurId FROM utilisateur WHERE utilisateurId = ?';
        const oneUtilisateur = await query(connexion, sql,[getUtilisateur])

        connexion.end()
        if(!oneUtilisateur)
            return Utils.apiResponse(res, Promise.resolve({
                status: 422,
                message: "Le utilisateur n'exist pas",
                data: null,
                error: true
            }))
        
        next()
    }
}
module.exports = UtilisateurMiddleware