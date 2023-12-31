//import model bd
const Proyecto = require("../model/Proyecto");
//import fuctions express
const {validationResult} = require("express-validator");
exports.crearProyecto = async (req, res) => {
  //revisar si hay errores
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({error: error.array()});
  }
  try {
    const proyecto = new Proyecto(req.body);
    proyecto.creador = req.usuario.id;
    proyecto.save();
    res.json(proyecto);
  } catch (error) {
    console.log(error);
  }
};

//obtener todos los proyectos del usuario actual
exports.obtenerProyectos = async (req, res) => {
  try {
    const proyecto = await Proyecto.find({creador: req.usuario.id}).sort({
      creado: -1,
    });
    res.json({proyecto});
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

//actualizar proyecto
exports.actualizarProyecto = async (req, res) => {
  //revisar si hay errores
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({error: error.array()});
  }

  //extraer la información del proyecto
  const {nombre} = req.body;
  const nuevoProyecto = {};

  if (nombre) {
    nuevoProyecto.nombre = nombre;
  }

  try {
    //revisar el id
    let proyecto = await Proyecto.findById(req.params.id);

    //si el proyecto existe o no
    if (!proyecto) {
      return res.status(404).json({msg: "Proyecto no encontrado"});
    }

    //verificar el creador del proyecto
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({msg: "No autorizado"});
    }
    //actualizar
    proyecto = await Proyecto.findByIdAndUpdate(
      {_id: req.params.id},
      {$set: nuevoProyecto},
      {new: true}
    );

    res.json({proyecto});
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

//eliminar proyecto
exports.eliminarProyecto = async (req, res) => {
  try {
    //revisar el id
    let proyecto = await Proyecto.findById(req.params.id);

    //si el proyecto existe o no
    if (!proyecto) {
      return res.status(404).json({msg: "Proyecto no encontrado"});
    }

    //verificar el creador del proyecto
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({msg: "No autorizado"});
    }

    await Proyecto.deleteOne({_id: req.params.id});
    res.json({msg: "Proyecto eliminado"});
  } catch (error) {
    console.log(error);
  }
};
