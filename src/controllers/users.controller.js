/*
  Controller de user
*/
import User from "../models/User";
import Role from "../models/Role";

// fn para crear users
export const createUser = async (req, res) => {
  const { username, email, roles } = req.body;

  // creo una instancia de User
  let user = new User({
    username,
    email,
    password: await User.encryptPassword("changeme"),
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

  user.save((error, user) => {
    resServer(res, error, user);
  });
};

// fn para recuperar todos los users
export const getUsers = async (req, res) => {
  User.find({}, { password: 0 })
    .populate("roles", { _id: 0 })
    .exec((error, users) => {
      resServer(res, error, users);
    });
};

/*
  Esta función abstrae la respuesta del servidor
*/
function resServer(res, error, resource) {
  if (error)
    return res.status(500).send({
      message: "Internal server error.",
    });
  if (!resource)
    return res.status(404).send({
      message: "404 not found.",
    });

  res.status(200).json({ data: resource });
}
