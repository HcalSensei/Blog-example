//import { resolve } from "path";
const jwt = require('jsonwebtoken')
const config =require('./config')
const Utils = require('./utils')

class JwtMiddleware{
    static checktoken(req, res, next){
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return Utils.apiResponse(
                res,
                Promise.resolve({
                    status: 401,
                    message: 'error',
                    data: 'Accès non autorisée',
                    error: true
                })
            )
        }
    
        const token = authHeader.split(' ')[1];
        try {
            const decode = jwt.verify(token, config.jwt.secret)
            req.utilisateurToken = decode
            next()
        } catch (error) {
            const errName = error.name;
            let errLabel;
            if(errName==='TokenExpireError'){
                errLabel = 'Votre session à expiré!!';
            }
            else if(errName === 'JsonWebTokenError'){
                errLabel = 'Signature du token invalide';
            }else{
                errLabel = error;
            }
            return Utils.apiResponse(res, 
                Promise.resolve({
                    status: 403,
                    message: 'error',
                    data: errLabel,
                    error: true
                })
            )
        }
    }

    static checkAuth(req, res, next){
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return Utils.apiResponse(
                res,
                Promise.resolve({
                    status: 401,
                    message: 'error',
                    data: 'Accès non autorisée',
                    error: true
                })
            )
        }
    
        const token = authHeader.split(' ')[1];
        try {
            const decode = jwt.verify(token, config.auth.secret)
            req.authToken = decode
            next()
        } catch (error) {
            const errName = error.name;
            let errLabel;
            if(errName==='TokenExpireError'){
                errLabel = 'Votre session à expiré!!';
            }
            else if(errName === 'JsonWebTokenError'){
                errLabel = 'Signature du token invalide';
            }else{
                errLabel = error;
            }
            return Utils.apiResponse(res, 
                Promise.resolve({
                    status: 403,
                    message: 'error',
                    data: errLabel,
                    error: true
                })
            )
        }
    }

    static generateToken(data){

        const accesstoken = jwt.sign(data, config.jwt.secret, {
            expiresIn: '40m'
        })
        
        return accesstoken
    }

    static generateAuth(data){

        const accessAuth = jwt.sign(data, config.auth.secret, {
            expiresIn: '90m'
        })
        
        return accessAuth
    }
    
    static verifyLevel(accesLvl, accesRequired){
        let splitedAccess = accesLvl.split('-')
        for (let i = 0; i < splitedAccess.length; i++) {
            console.log(splitedAccess[i])
            if(splitedAccess[i]==accesRequired){
                //console.log(true)
                return true
            }
            
            
        }
        //console.log(false)
        return false
    }
}

module.exports = JwtMiddleware