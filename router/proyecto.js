const express = require("express");
//Import controller
const proyectoController = require("../controller/proyectoController");
//ruta para crear proyectos
const router = express.Router();

//api/proyecto
router.post("/", proyectoController.crearProyecto);

module.exports = router;
