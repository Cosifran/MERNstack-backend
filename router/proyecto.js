const express = require("express");
//ruta para crear proyectos
const router = express.Router();
//Import controller
const proyectoController = require("../controller/proyectoController");
//import middleware
const auth = require("../middleware/auth");

//api/proyecto
router.post("/", auth, proyectoController.crearProyecto);

router.get("/", auth, proyectoController.crearProyecto);

module.exports = router;
