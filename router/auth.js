const express = require("express");
//import controller
const authController = require("../controller/authController");
//rutas para crear un usuario
const router = express.Router();
//import fuctions express-validator
const {check} = require("express-validator");
//import middleware
const auth = require("../middleware/auth");

//api/auth
router.post("/", [
  check("email", "Agrega un email válido").isEmail(),
  check("password", "El password debe ser minimo 6 caracteres").isLength({
    min: 6,
  }),
  authController.autenticarUsuario,
]);

router.get("/", auth, authController.usuarioAutenticado);

module.exports = router;
