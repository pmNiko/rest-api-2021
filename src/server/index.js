/*
  Archivo principal de nuestra API
*/
// import "@babel/polyfill"; //polyfill deprecado
import dotenv from "dotenv";
import { createRoles } from "../libs/initialSetup";
import app from "./app";
import { connect } from "./database";

createRoles(); //creación inicial de roles

const { NODE_ENV } = process.env;

const config = dotenv.config();
const { SERVER_PORT } = config.parsed;

app.listen(SERVER_PORT); //server run on port 3002
connect(); //conexión database

console.log(`>>>> Environment: ${NODE_ENV}🎫 <<<<`);
console.log(`>>>> Server run on port ${SERVER_PORT} 🖥`);
