const express = require("express");
//import controller
const usuariosController = require("../controller/usuariosController");
//rutas para crear un usuario
const router = express.Router();
//import fuctions express-validator
const { check } = require('express-validator')

router.post("/", 
[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Agrega un email válido').isEmail(),
    check('password', 'El password debe ser minimo 6 caracteres').isLength({min: 6})
],
usuariosController.crearUsuario);

module.exports = router;
