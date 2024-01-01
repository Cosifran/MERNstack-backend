//import model bd
const Tareas = require("../model/Tareas");
const Proyecto = require("../model/Proyecto");
//import fuctions express
const {validationResult} = require("express-validator");

exports.crearTarea = async (req, res) => {
  //revisar si hay errores
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({error: error.array()});
  }

  try {
    const {proyecto} = req.body;

    const proyectoExiste = await Proyecto.findById(proyecto);

    if (!proyectoExiste) {
      return res.status(404).json({msg: "Proyecto no encontrado"});
    }

    //verificar si el proyecto actual pertenece al usuario autenticado
    if (proyectoExiste.creador.toString() !== req.usuario.id) {
      return res.status(401).json({msg: "No autorizado"});
    }

    //creamos la tarea
    const tarea = new Tareas(req.body);
    await tarea.save();
    res.json({tarea});
  } catch (error) {
    console.log(error);
    res.status(500).sed("Hubo un error");
  }
};
