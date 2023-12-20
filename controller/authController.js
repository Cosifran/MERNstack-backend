//import jwt
const jwt = require("jsonwebtoken");
//import bscryptjs
const bscryptjs = require("bcryptjs");
//import model bd
const Usuario = require("../model/Usuario");
//import fuctions express-validator
const {validationResult} = require("express-validator");

exports.autenticarUsuario = async (req, res) => {
  //revisar si hay errores
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({error: error.array()});
  }

  //extraer email y password
  const {email, password} = req.body;
  try {
    //revisar si el usuario está registrado
    let usuario = await Usuario.findOne({email});
    if (!usuario) {
      return res.status(400).json({msg: "El usuario no existe"});
    }

    const passCorrecto = await bscryptjs.compare(password, usuario.password);

    if (!passCorrecto) {
      return res.status(400).json({msg: "Contraseña incorrecta"});
    }

    //si todo es correcto se crea y se firma el JWT

    const payload = {
      id: usuario.id,
    };

    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) throw error;

        //mensaje de confirmacion
        res.json({token});
      }
    );
  } catch (error) {
    console.log(error);
  }
};
