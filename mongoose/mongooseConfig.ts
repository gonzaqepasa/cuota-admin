/* This is a database connection function*/
const mongoose = require("mongoose");
const { URL_MONGODB } = require("../server/config/env_d");

export {};
const connection: any = {}; /* creating connection object*/
console.log("asddddddd Llego hastra ascascasd asdas");

async function dbConnect() {
  /* check if we have connection to our databse*/
  try {
    if (connection.isConnected) {
      console.log("Ya existe una conexion, continuamos en esa!");
      return;
    }

    /* connecting to our database */
    const db = await mongoose.connect(URL_MONGODB, {});

    connection.isConnected = db.connections[0].readyState;
    console.log("|> Mongo DB conectado ");
  } catch (e) {
    console.log("Error", e);
  }
}
dbConnect();

module.exports = {};
