const mongoose = require("mongoose");
require("dotenv").config({path: ".env"});

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.BD_MONGO);
    console.log("Base de datos conectada");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = conectarDB;
