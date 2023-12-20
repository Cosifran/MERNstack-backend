const express = require("express");
const conectarDB = require("./config/db");

//crear el servidor
const app = express();

conectarDB();

//habilitar express.json
app.use(express.json({extended: true}));

//puerto de la app
const PORT = process.env.PORT || 4000;

//definir pagina principal
app.get("/", (req, res) => {
  res.send("hola mundo");
});

//importar rutas
app.use("/api/usuarios", require("./router/usuarios"));
app.use("/api/auth", require("./router/auth"));

//arrancar la app
app.listen(PORT, () => {
  console.log(`El servidor está funcionando en el puerto ${PORT}`);
});
