//import jwt
const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
    //leer token de header
    const token = req.header('x-auth-token')

    console.log(token)

    //revisar si no hay token
    if(!token){
        return res.status(401).json({msg: 'No hay token, permiso no válido'})
    }

    //validar si no hay token

    try {
        const cifrado = jwt.verify(token, process.env.SECRETA)
        console.log(cifrado)
        req.usuario = cifrado.usuario
        next()
    } catch (error) {
        res.status(402).json({msg: 'Token no valido'})
    }
}