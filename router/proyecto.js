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

//obtiene los proyectos
router.get("/", auth, proyectoController.obtenerProyectos);

//actualizar un proyecto
router.put(
  "/:id",
  auth,
  [check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty()],
  proyectoController.actualizarProyecto
);

//eliminar un proyecto
router.delete("/:id", auth, proyectoController.eliminarProyecto);

module.exports = router;
