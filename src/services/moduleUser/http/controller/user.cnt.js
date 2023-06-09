const { mysqlHelper } =require('../../../../core/db')
const {query } = require('../../../model')
const {cdg} = require('../../../../utils')
const bcrypt = require('bcrypt')
const { JwtMiddleware } = require('../../../../utils')


const utilisateurController = {
    getActivatedUsers: async ()=>{
        const connexion = mysqlHelper.connect()

        const sql = 'SELECT * FROM utilisateur WHERE utilisateurStatut=1 ORDER BY dateCreation DESC';
        const utilisateurs = await query(connexion, sql)
        connexion.end()
        return Promise.resolve({status:200, error: false, message: 'Liste des utilisateurs', data: utilisateurs.data})
    },
    getAllusers: async ()=>{
        const connexion = mysqlHelper.connect()

        const sql = 'SELECT * FROM utilisateur ORDER BY dateCreation DESC';
        const utilisateurs = await query(connexion, sql)
        connexion.end()

        return Promise.resolve({status:200, error: false, message: 'Liste des utilisateurs', data: utilisateurs.data})
    },
    create: async(user)=>{
        const connexion = mysqlHelper.connect()
        const sql = 'INSERT INTO utilisateur (utilisateurNom, utilisateurPrenom, utilisateurEmail, utilisateurTelephone, utilisateurMotDePasse, dateCreation, dateModification) VALUES(?,?,?,?,?,NOW(),NOW())';
        let encpass = await cdg.encryptPassword(user.utilisateurMotDePasse)
        if(typeof encpass ==='boolean')
            return Promise.resolve({status:500, error: true, message: "Une erreur interne s'est produite", data: result})

        user.utilisateurMotDePasse= encpass
        const result = await query(connexion, sql, [
            user.utilisateurNom,
            user.utilisateurPrenom,
            user.utilisateurEmail,
            user.utilisateurTelephone,
            user.utilisateurMotDePasse
        ])
        connexion.end()
        return Promise.resolve({status:200, error: false, message: "Ajout d'un nouvel utilisateur", data: result.data})
    },
    login:async (userData)=>{
        const connexion = mysqlHelper.connect()
        const sql = 'SELECT * FROM utilisateur WHERE utilisateurEmail = ?';
        const onUtilisateur = await query(connexion, sql, [userData.utilisateurEmail]);
        const passwordIsValid = bcrypt.compareSync(userData.utilisateurMotDePasse, onUtilisateur.data[0].utilisateurMotDePasse)

        if(!onUtilisateur || !passwordIsValid)
            return Promise.resolve({status:402, error: true, message: "Email ou mot de passe incorrect", data: null})

        
        const accesstoken = JwtMiddleware.generateToken({
            utilisateurId: onUtilisateur.data[0].utilisateurId,
            utilisateurNom: onUtilisateur.data[0].utilisateurNom,
            utilisateurPrenom: onUtilisateur.data[0].utilisateurPrenom,
            utilisateurEmail: onUtilisateur.data[0].utilisateurEmail,
            utilisateurTelephone: onUtilisateur.data[0].utilisateurTelephone,
            dateCreation: onUtilisateur.data[0].dateCreation,
            dateModification: onUtilisateur.data[0].dateModification,
        })
        connexion.end()
        return Promise.resolve({status:200, error: false, message: "Un utilisateur", data: accesstoken})
    },
    update: async (utilisateurData, utilisateurId)=>{
        const connexion = mysqlHelper.connect()
        const sql = 'UPDATE utilisateur SET utilisateurNom=?,utilisateurPrenom=?,utilisateurTelephone=?,dateModification=NOW() WHERE utilisateurId=?'
        const result = await query(connexion, sql,[
            utilisateurData.utilisateurNom,
            utilisateurData.utilisateurPrenom,
            utilisateurData.utilisateurTelephone,
            utilisateurId
        ])
        connexion.end()

        return Promise.resolve({status:200, error: false, message: "utilisateur Modifié", data: result.data})
    },
    desactiveUser: async (utilisateurId)=>{
        const connexion = mysqlHelper.connect()
        const sql = 'UPDATE utilisateur SET utilisateurStatut=0, dateModification=NOW() WHERE utilisateurId=?';
        const result = await query(connexion, sql,[ 
            utilisateurId
        ])
        connexion.end()

        return Promise.resolve({status:200, error: false, message:"utilisateur désactivé", data: result.data})
    }

}

module.exports = utilisateurController
