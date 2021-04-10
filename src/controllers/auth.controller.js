/*
  Controller de authenticación
*/

import User from "../models/User";
import Role from "../models/Role";
import * as token from "../libs/token";

// fn para dar de alta un usuario
export const singup = async (req, res) => {
  const { username, email, password, roles } = req.body;

  // creo una instancia de User
  let user = new User({
    username,
    email,
    password: await User.encryptPassword(password),
  });

  // comprobación de roles
  if (roles) {
    //si nos envian roles
    const foundRoles = await Role.find({ name: { $in: roles } });
    if (!foundRoles)
      return res.status(422).json({ message: "Roles not found" });
    user.roles = foundRoles.map((role) => role._id);
  } else {
    //asignación de rol por defecto
    const role = await Role.findOne({ name: "user" });
    user.roles = [role._id];
  }

  //lo guardamos en la BD
  const savedUser = await user.save();

  // creación del token
  const tokenJwt = token.sign({ id: savedUser._id });

  res.status(200).json({ tokenJwt });
};

// fn para login de user
export const signin = async (req, res) => {
  // busqueda del user por email
  const userFound = await User.findOne({ email: req.body.email }).populate(
    "roles"
  );

  // si el email no existe devolvemos un 404
  if (!userFound) return res.status(404).json({ message: "User not found" });

  // validacion de password
  const matchPassword = await User.comparePassword(
    req.body.password,
    userFound.password
  );

  if (!matchPassword)
    return res.status(401).json({ token: null, message: "Invalid password" });

  // creación del token
  const tokenJwt = token.sign({ id: userFound._id });

  res.json({ tokenJwt });
};
