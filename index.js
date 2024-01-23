const express = require("express");
const conectarDB = require("./config/db");
//import cors
const cors = require("cors");

//crear el servidor
const app = express();

conectarDB();

//habilitar cors
app.use(cors());
//habilitar express.json
app.use(express.json({extended: true}));

//puerto de la app
const PORT = process.env.PORT || 4000;

//definir pagina principal
app.get("/", (req, res) => {
  res.send("Servidor iniciado");
});

//importar rutas
app.use("/api/auth", require("./router/auth"));
app.use("/api/usuarios", require("./router/usuarios"));
app.use("/api/proyectos", require("./router/proyecto"));
app.use("/api/tareas", require("./router/tareas"));

//arrancar la app
app.listen(PORT, () => {
  console.log(`El servidor está funcionando en el puerto ${PORT}`);
});
