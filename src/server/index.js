/*
  Archivo principal de nuestra API
*/
import app from "./app";
import { connect } from "./database";

app.listen(4000); //server run on port 3002
connect(); //conexión database

console.log("Server corriendo correctamente!!!");
