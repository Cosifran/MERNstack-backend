const express = require("express");
//ruta para crear proyectos
const router = express.Router();
//Import controller
const tareaController = require("../controller/tareaController");
//import middleware
const auth = require("../middleware/auth");
//import fuction express
const {check} = require("express-validator");

//api/tareas
//crear tarea
router.post(
    "/",
    auth,
    [check("nombre", "El nombre de la tarea es obligatorio").not().isEmpty()],
    [check("proyecto", "El proyecto es obligatorio").not().isEmpty()],
    tareaController.crearTarea
  );
//obtener tarea
  router.get(
    "/",
    auth,
    tareaController.obtenerTareas
  )
//actualizar tarea
router.put(
  "/:id",
  auth,
  tareaController.actualizarTarea
)

//eliminar tarea
router.delete(
  "/:id",
  auth,
  tareaController.eliminarTarea
)

  module.exports = router;