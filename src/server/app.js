/*
  Configuración de nuestro servidor 
*/
import express from "express";
import morgan from "morgan"; //log por consola
import pkg from "../../package.json"; //datos del package.json
import productsRoutes from "../routes/products.routes";
import authRoutes from "../routes/auth.routes";
import usersRoutes from "../routes/users.routes";

const app = express(); //creación del server

app.use(express.json()); //admite los objetos json que recibe

app.use(morgan("dev")); //middleware propio de express

// seteamos un par clave valor en express
app.set("pkg", pkg);

app.get("/", (req, res) => {
  // destruct de las props que nos interesan de pkg
  let { name, author, description, version } = app.get("pkg");
  res.json({
    name,
    author,
    description,
    version,
  });
});

// Middleware para setear la url del end point
app.use("/api/products", productsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

export default app;
