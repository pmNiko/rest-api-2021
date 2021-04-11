/*
  Conección al cliente del motor de la BD 
*/
import mongoose from "mongoose";
import dotenv from "dotenv";

const { NODE_ENV } = process.env;
const result = dotenv.config();
const {
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_DATABASE_DEV,
  DB_DATABASE_TEST,
} = result.parsed;

const url = `${DB_HOST}:${DB_PORT}/`;
let environment = "";

switch (NODE_ENV) {
  case "prod":
    environment = `${url}${DB_DATABASE}`;
    break;
  case "dev":
    environment = `${url}${DB_DATABASE_DEV}`;
    break;
  default:
    environment = `${url}${DB_DATABASE_TEST}`;
    break;
}

export async function connect() {
  await mongoose
    .connect(`${environment}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true,
    })
    .then((db) => console.log(`>>>> Database is connected on ${environment} 🗂`))
    .catch((err) => console.log(">>> Error: ", err));
}
