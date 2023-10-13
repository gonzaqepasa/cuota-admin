/* This is a database connection function*/
import mongoose from "mongoose";
import { URL_MONGODB } from "../src/config/env_d";

const connection: any = {}; /* creating connection object*/

async function dbConnect() {
  /* check if we have connection to our databse*/
  if (connection.isConnected) {
    return;
  }

  /* connecting to our database */
  const db = await mongoose.connect(URL_MONGODB, {});

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
