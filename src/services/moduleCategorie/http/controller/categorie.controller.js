const {mysqlHelper} = require('../../../../core/db')
const {query} = require('../../../model')
const {cdg, JwtMiddleware} = require('../../../../utils')
const bcrypt = require('bcrypt')

const categorieController  ={
    create: async(categorie)=>{
        const connexion = mysqlHelper.connect()
        const sql = 'INSERT INTO categorie (categorieLibelle, statusCategoriedo, dateCreation,dateModification) VALUES(?,1,NOW(),NOW())';
        
        const result = await query(connexion, sql, [
            categorie.categorieLibelle
        ])
        connexion.end()
        return Promise.resolve({status:200, error: false, message: "Ajout d'une nouvelle categorie", data: result.data})
    },
    getActivatedCategorie: async ()=>{
        const connexion = mysqlHelper.connect()

        const sql = 'SELECT * FROM categorie WHERE statusCategoriedo=1 ORDER BY dateCreation DESC';
        const categories = await query(connexion, sql)
        connexion.end()

        return Promise.resolve({status:200, error: false, message: 'Liste des categories', data: categories.data})
    },
    getAllCategorie: async ()=>{
        const connexion = mysqlHelper.connect()

        const sql = 'SELECT * FROM categorie ORDER BY dateCreation DESC';
        const categories = await query(connexion, sql)
        connexion.end()

        return Promise.resolve({status:200, error: false, message: 'Liste des categories', data: categories.data})
    },
    getOneCategorie: async (categorieId)=>{
        const connexion = mysqlHelper.connect()
        const sql = 'SELECT * FROM categorie WHERE categorieId =?';
        const categorieOne = await query(connexion, sql, [
            categorieId 
        ])
        connexion.end()

        return Promise.resolve({status:200, error: false, message: 'Une categorie', data: categorieOne.data})
    },
    update: async (data, categorieId )=>{
        const connexion = mysqlHelper.connect()
        const sql= 'UPDATE categorie SET categorieLibelle=?, dateModification=NOW() WHERE categorieId =?'
        const result = await query(connexion, sql, [
            data.categorieLibelle,
            categorieId
        ])
        connexion.end()

        return Promise.resolve({status:200, error: false, message: 'Categorie modifier', data: result.data})
    },
    delete: async(categorieId)=>{
        const connexion = mysqlHelper.connect()
        const sql= 'UPDATE categorie SET statusCategoriedo=0, dateModification=NOW() WHERE categorieId =?'
        const result = await query(connexion, sql, [
            categorieId
        ])
        connexion.end()

        return Promise.resolve({status:200, error: false, message: 'Categorie modifier', data: result.data})
    }
}
module.exports = categorieController