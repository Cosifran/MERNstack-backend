const express = require("express");
//ruta para crear proyectos
const router = express.Router();
//Import controller
const proyectoController = require("../controller/proyectoController");
//import middleware
const auth = require("../middleware/auth");
//import fuction express
const {check} = require("express-validator");

//api/proyecto
router.post(
  "/",
  auth,
  [check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty()],
  proyectoController.crearProyecto
);

router.get("/", auth, proyectoController.crearProyecto);

module.exports = router;
