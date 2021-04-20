/*
  Comprobación de existencia de usario al registrarse, 
  y si el rol enviado exite para su asignación .
*/

// import { ROLES } from "../models/Role";
import User from "../models/User";
import Role from "../models/Role";

// verifica que el role enviado exista
export const checkRoles = async (req, res, next) => {
  let roles = req.body.roles;
  if (roles) {
    const existingRoles = await Role.find({});
    for (let i = 0; i < roles.length; i++) {
      if (!existingRoles.some((role) => role.name === roles[i])) {
        return res.status(400).json({
          message: `Role ${roles[i]} does not exists.`,
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

  if (user)
    return res.status(400).json({ message: "username already exists." });

  const emailUser = await User.findOne({ email: email });

  if (emailUser)
    return res.status(400).json({ message: "email already exists." });

  next();
};
