const {mysqlHelper} = require('../../../../core/db')
const {query} = require('../../../model')
const {cdg, JwtMiddleware} = require('../../../../utils')
const bcrypt = require('bcrypt')

const postController = {
    create: async(postData)=>{
        const connexion = mysqlHelper.connect()
        const sql = 'INSERT INTO post (postTitre, postTheme, postContenu, auteurId, postMedia, postCategorieId, typePost, statusPostdo,dateCreation, dateModification) VALUES(?,?,?,?,?,?,?,1,NOW(),NOW())'
        const result = await query(connexion, sql, [
            postData.postTitre,
            postData.postTheme,
            postData.postContenu,
            postData.auteurId,
            postData.postMedia,
            postData.postCategorieId,
            postData.typePost
        ])
        connexion.end()
        return Promise.resolve({status:200, error: false, message: "Ajout d'un nouveau post", data: result.data})
    },
    getActivatedPost: async()=>{
        const connexion = mysqlHelper.connect()
        const sql = 'SELECT * FROM post WHERE statusPostdo=1 ORDER BY dateCreation DESC'
        const result = await query(connexion, sql)
        connexion.end()

        return Promise.resolve({status:200, error: false, message: "Liste de post", data: result.data})
    },
    getAllPost: async ()=>{
        const connexion = mysqlHelper.connect()
        const sql = 'SELECT * FROM post ORDER BY dateCreation DESC'
        const result = await query(connexion, sql)
        connexion.end()

        return Promise.resolve({status:200, error: false, message: "Liste de post", data: result.data})
    },
    getOnePost: async (postId)=>{
        const connexion = mysqlHelper.connect()
        const sql = 'SELECT * FROM post WHERE postId = ?'
        const result = await query(connexion, sql,[
            postId
        ])
        connexion.end()

        return Promise.resolve({status:200, error: false, message: "Un post", data: result.data})
    }
}
module.exports = postController