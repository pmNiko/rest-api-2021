/*
  Conección al cliente del motor de la BD 
*/
import mongoose from "mongoose";

export async function connect() {
  await mongoose
    .connect("mongodb://localhost/apiRestProducts", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true,
    })
    .then((db) => console.log(">>>> Database is connected!"))
    .catch((err) => console.log(">>> Error: ", err));
}
