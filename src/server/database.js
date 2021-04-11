/*
  Conección al cliente del motor de la BD 
*/
import mongoose from "mongoose";
import dotenv from "dotenv";

const { NODE_ENV } = process.env;
const result = dotenv.config();
const { DB_HOST, DB_PORT, DB_DATABASE, DB_DATABASE_TEST } = result.parsed;

let environment = `${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

if (NODE_ENV === "prod") {
  environment = `${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
}

if (NODE_ENV === "test") {
  environment = `${DB_HOST}:${DB_PORT}/${DB_DATABASE_TEST}`;
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
