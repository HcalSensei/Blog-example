const Router = require('../../../core/router/router')
const {Utils} = require('../../../utils')
const {utilisateurController} = require('../http/controller')
const {UtilisateurMiddleware} = require('../http/middleware')
const { Validator } = require('../../../utils')

class UtilisateurRoutes extends Router{
    constructor(app){
        super(app)
    }

    getRoutes(){
        this.app.get('/test/utilisateur', (_req, res)=>{

            return Utils.apiResponse(res, utilisateurController.create({
                utilisateurNom: "test",
                utilisateurPrenom: "C'est le test",
                utilisateurEmail: "test@test.fr",
                utilisateurTelephone:"002250707070707",
                utilisateurMotDePasse: "azerty",
            }))
        })

        this.app.get(
            '/utilisateurs-info',
            (req, res)=>{
                return Utils.apiResponse(res, utilisateurController.getActivatedUsers())
            }
        )

        this.app.get(
            '/utilisateurs',
            (req, res)=>{
                return Utils.apiResponse(res, utilisateurController.getAllusers())
            }
        )

        this.app.post(
            '/utilisateur/register',
            UtilisateurMiddleware.register(),
            UtilisateurMiddleware.verifyUtilisateurByMail,
            Validator.validate,
            (req, res)=>{
                const data = req.body
                delete data.confirmMotDePasse
                return Utils.apiResponse(res, utilisateurController.create(data))
            }
        )

        this.app.post(
            '/utilisateur/login',
            (req, res)=>{
                const userData = req.body
                return Utils.apiResponse(res, utilisateurController.login(userData))
            }
        )

        this.app.post(
            '/utilisateur/update/:id',
            UtilisateurMiddleware.verifyUtilisateurById,
            (req, res)=>{
                const utilisateurId = req.params.id
                const utilisateurData = req.body
                return Utils.apiResponse(res, utilisateurController.update(utilisateurData, utilisateurId))
            }
        )

        this.app.post(
            '/utilisateur/delete/:id',
            UtilisateurMiddleware.verifyUtilisateurById,
            (req, res)=>{
                const utilisateurId = req.params.id
                return Utils.apiResponse(res, utilisateurController.desactiveUser(utilisateurId))
            }
        )

    }
}
module.exports = UtilisateurRoutes
