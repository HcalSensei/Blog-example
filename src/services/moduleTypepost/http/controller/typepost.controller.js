const {mysqlHelper} = require('../../../../core/db')
const {query} = require('../../../model')
const {cdg, JwtMiddleware} = require('../../../../utils')
const bcrypt = require('bcrypt')

const typepostController={
    create: async(typePost)=>{
        const connexion =  mysqlHelper.connect()
        const sql = 'INSERT INTO type_post (typepostLibelle, statusTypepostdo,dateCreation,dateModification) VALUES(?,1,NOW(),NOW())';
       
        const result = await query(connexion, sql, [
            typePost.typepostLibelle
        ])
        connexion.end()
        return Promise.resolve({status:200, error: false, message: "Ajout d'un nouvel type de post", data: result.data})
    },
    update: async (typepost, typepostId)=>{
        const connexion = mysqlHelper.connect();
        const sql= 'UPDATE type_post SET typepostLibelle=?, dateModification=NOW() WHERE typePostId=?'
        const result = await query(connexion, sql, [
            typepost.typepostLibelle,
            typepostId
        ])
        connexion.end()
        return Promise.resolve({status:200, error: false, message: "Type de post modifier", data: result.data})

    },
    getAllTypepost: async ()=>{
        const connexion = mysqlHelper.connect()

        const sql = 'SELECT * FROM type_post WHERE statusTypepostdo=1 ORDER BY dateCreation DESC';
        const utilisateurs = await query(connexion, sql)
        connexion.end()

        return Promise.resolve({status:200, error: false, message: 'Liste des types de poste', data: utilisateurs.data})
    },
    getTypepost: async ()=>{
        const connexion = mysqlHelper.connect()

        const sql = 'SELECT * FROM type_post ORDER BY dateCreation DESC';
        const allTypepost = await query(connexion, sql)
        connexion.end()

        return Promise.resolve({status:200, error: false, message: 'Liste des types de poste', data: allTypepost.data})
    },
    getOneTypepost: async(typepostId)=>{
        const connexion = mysqlHelper.connect()

        const sql = 'SELECT * FROM type_post WHERE typePostId=?';
        const allTypepost = await query(connexion, sql,[typepostId])
        connexion.end()
        return Promise.resolve({status:200, error: false, message: 'une types de poste', data: allTypepost.data})
    },
    deleteOneTypepost: async (typepostId)=>{
        const connexion = mysqlHelper.connect()

        const sql = 'UPDATE type_post SET statusTypepostdo=0, dateModification=NOW() WHERE typePostId=?';
        const deleteTypepost = await query(connexion, sql,[typepostId])
        connexion.end()
        return Promise.resolve({status:200, error: false, message: 'Post supprimer', data: deleteTypepost.data})
    }
}
module.exports = typepostController
