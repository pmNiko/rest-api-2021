/*
  Comprobación de existencia de usario al registrarse, 
  y si el rol enviado exite para su asignación .
*/

import { ROLES } from "../models/Role";
import User from "../models/User";

// verifica que el role enviado exista
export const checkRoles = (req, res, next) => {
  let roles = req.body.roles;
  console.log("No existe", roles);
  if (roles) {
    for (let i = 0; i < roles.length; i++) {
      if (!ROLES.includes(roles[i])) {
        return res.status(400).json({
          message: ` Role ${roles[i]} does not exists`,
        });
      }
    }
  }
  next();
};

// verifica que el username y/o email no se duplique
export const duplicate = async (req, res, next) => {
  const { username, email } = req.body;

  const user = await User.findOne({ username: username });

  if (user) return res.status(400).json({ message: "user already exists" });

  const emailUser = await User.findOne({ email: email });

  if (emailUser)
    return res.status(400).json({ message: "email already exists" });

  next();
};
