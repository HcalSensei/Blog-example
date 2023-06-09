const Router = require('../../../core/router/router')
const {Utils} = require('../../../utils')
const {adminController} = require('../http/controller')
const {AdminMiddleware} = require('../http/middleware')
const { body } = require('express-validator')
const { Validator } = require('../../../utils')

class AdminRoutes extends Router{
    constructor(app){
        super(app)
    }

    getRoutes(){
        this.app.get('/test/admin', (_req, res)=>{

            return Utils.apiResponse(res, adminController.create({
                adminNom: "test",
                adminTypego: 0,
                adminEmail: "test@test.fr",
                adminMotDePasse: "azerty",
                niveauAcces:"c-r-u-d-crud"
            }))
        })

        this.app.post(
            '/admin/register',
            AdminMiddleware.register(),
            AdminMiddleware.verifyAdminMail,
            (req, res)=>{
                const data = req.body
                delete data.confirmMotDePasse
                return Utils.apiResponse(res, adminController.create(data))
            }
        )

        this.app.post(
            '/admin/login',
            AdminMiddleware.verifyAdminMailTrue,
            (req, res)=>{
                const adminData = req.body
                return Utils.apiResponse(res, adminController.login(adminData))
            }
        )
    }
}
module.exports=AdminRoutes
