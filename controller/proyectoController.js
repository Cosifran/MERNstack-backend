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
