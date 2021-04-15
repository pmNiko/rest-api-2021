import Role from "../models/Role";

// fn para recuperar todos los users
export const getRoles = async (req, res) => {
  Role.find({}).exec((error, roles) => {
    resServer(res, error, roles);
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
