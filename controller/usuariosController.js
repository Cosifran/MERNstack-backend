//import jwt
const jwt = require("jsonwebtoken");
//import bscryptjs
const bscryptjs = require("bcryptjs");
//import model bd
const Usuario = require("../model/Usuario");
//import fuctions express-validator
const {validationResult} = require("express-validator");

exports.crearUsuario = async (req, res) => {
  const error = validationResult(req);
  //revisar si hay errores
  if (!error.isEmpty()) {
    return res.status(400).json({error: error.array()});
  }
  const {email, password} = req.body;
  try {
    //revisar que el nuevo usuario sea unico
    let usuario = await Usuario.findOne({email});
    if (usuario) {
      return res.status(400).json({msg: "El email ya existe"});
    }

    //crea el usuario
    usuario = new Usuario(req.body);

    //haschear password
    let salt = await bscryptjs.genSalt(10);
    usuario.password = await bscryptjs.hash(password, salt);
    //guarda al usuario en base de datos
    await usuario.save();

    const payload = {
      id: usuario.id
    }
    
    jwt.sign(payload, process.env.SECRETA,{
      expiresIn: 3600
    }, (error, token ) => {
      if(error) throw error

      //mensaje de confirmacion
      res.json({token})
    } )
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};
