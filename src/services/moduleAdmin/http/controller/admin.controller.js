const {mysqlHelper} = require('../../../../core/db')
const {query} = require('../../../model')
const {cdg, JwtMiddleware} = require('../../../../utils')
const bcrypt = require('bcrypt')



const adminController ={
    create: async(admin)=>{
        const connexion = mysqlHelper.connect()
        const sql = 'INSERT INTO admin (adminNom, adminMotDePasse, niveauAcces, adminEmail, adminTypego, dateCreation,dateModification) VALUES(?,?,?,?,?,NOW(),NOW())';
        let encpass = await cdg.encryptPassword(admin.adminMotDePasse)
        if(typeof encpass ==='boolean')
            return Promise.resolve({status:500, error: true, message: "Une erreur interne s'est produite", data: result})

        admin.adminMotDePasse= encpass
        const result = await query(connexion, sql, [
            admin.adminNom,
            admin.adminMotDePasse,
            admin.niveauAcces,
            admin.adminEmail,
            admin.adminTypego
        ])
        connexion.end()
        return Promise.resolve({status:200, error: false, message: "Ajout d'un nouvel administrateur", data: result.data})
    },
    login:async (adminData)=>{
        const connexion = mysqlHelper.connect()

        const sql = 'SELECT * FROM admin WHERE adminEmail = ?';
        const onAdmin = await query(connexion, sql, [adminData.adminEmail]);
        const passwordIsValid = bcrypt.compareSync(adminData.adminMotDePasse, onAdmin.data[0].adminMotDePasse)
        connexion.end()
        if(!onAdmin || !passwordIsValid)
            return Promise.resolve({status:402, error: true, message: "Email ou mot de passe incorrect", data: null})

        
        const accesstoken = JwtMiddleware.generateAuth({
            adminID : onAdmin.data[0].adminID,
            adminNom: onAdmin.data[0].adminNom,
            niveauAcces: onAdmin.data[0].niveauAcces,
            adminEmail: onAdmin.data[0].adminEmail,
            adminTypego: onAdmin.data[0].adminTypego,
            dateCreation: onAdmin.data[0].dateCreation,
            dateModification: onAdmin.data[0].dateModification,
        })

        return Promise.resolve({status:200, error: false, message: "Un utilisateur", data: accesstoken})
    }
}
module.exports = adminController
