/* This is a database connection function*/
import mongoose from "mongoose";
import { URL_MONGODB } from "../config/env_d";


const connection: any = {}; /* creating connection object*/

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
export default dbConnect();
