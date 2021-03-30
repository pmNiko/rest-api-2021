/*
  Validación de token y rol asignado
*/
import config from "../server/config";
import jwt from "jsonwebtoken";
import User from "../models/User";
import Role from "../models/Role";

// Middleware encargado de verificar el token del user
export const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  // si el token no es enviado corta la ejecución
  if (!token) return res.status(403).json({ message: "No token provided." });

  try {
    // verifica la veracidad del token
    const decoded = jwt.verify(token, config.SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

// Verifica que sea un Moderator
export const isModerator = async (req, res, next) =>
  verifyRole("moderator", req, res, next);

// Verifica que sea un Admin
export const isAdmin = async (req, res, next) =>
  verifyRole("admin", req, res, next);

// Recibe un rol como string y lo compara con los roles del user
async function verifyRole(role, req, res, next) {
  // accedemos a la prop del req que seteamos en verifyToken
  const user = await User.findById(req.userId);

  // verificamos los roles del user por id de rol
  const roles = await Role.find({ _id: { $in: user.roles } });

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === role) {
      next();
      return;
    }
  }

  res.status(403).json({ message: `Require role ${role}` });
}
