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
//obtener tareas
exports.obtenerTareas = async (req, res) => {
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

    const tareas = await Tareas.find({proyecto});
    res.json({tareas});
  } catch (error) {
    console.log(error);
    res.status(500).sed("Hubo un error");
  }
};
//actualizar tarea
exports.actualizarTarea = async (req, res) => {
  try {
    const {proyecto, nombre, estado} = req.body;

    let tarea = await Tareas.findById(req.params.id);

    if (!tarea) {
      return res.status(404).json({msg: "No existe esa tarea"});
    }

    //extraer proyecto
    const proyectoExiste = await Proyecto.findById(proyecto);

    //verificar si el proyecto actual pertenece al usuario autenticado
    if (proyectoExiste.creador.toString() !== req.usuario.id) {
      return res.status(401).json({msg: "No autorizado"});
    }

    //crear objeto con la nueva información
    const nuevaTarea = {};
    if (nombre) {
      nuevaTarea.nombre = nombre;
    }
    if (estado) {
      nuevaTarea.estado = estado;
    }
    tarea = await Tareas.findByIdAndUpdate({_id: req.params.id}, nuevaTarea, {
      new: true,
    });
    res.json({tarea});
  } catch (error) {
    console.log(error);
    res.status(500).sed("Hubo un error");
  }
};

exports.eliminarTarea = async (req, res) => {
  try {
    const {proyecto} = req.body;
    const tarea = await Tareas.findById(req.params.id);

    if (!tarea) {
      return res.status(404).json({msg: "No existe esa tarea"});
    }

    //extraer proyecto
    const proyectoExiste = await Proyecto.findById(proyecto);

    //verificar si el proyecto actual pertenece al usuario autenticado
    if (proyectoExiste.creador.toString() !== req.usuario.id) {
      return res.status(401).json({msg: "No autorizado"});
    }

    await Tareas.deleteOne({_id: req.params.id});
    res.json({msg: "Tarea eliminada"});
  } catch (error) {
    console.log(error);
    res.status(500).sed("Hubo un error");
  }
};
