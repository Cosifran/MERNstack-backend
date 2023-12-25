//import model bd
const Proyecto = require("../model/Proyecto");
exports.crearProyecto = async (req, res) => {
    try {
       const proyecto = new Proyecto(req.body)
       proyecto.save()
       res.json(proyecto)
    } catch (error) {
        console.log(error)
    }   
}