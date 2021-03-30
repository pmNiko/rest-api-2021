import Role from "../models/Role";

export const createRoles = async () => {
  try {
    // devuelve la cantidad de documentos existentes del
    const count = await Role.estimatedDocumentCount();

    //Si existen roles corta el proceso
    if (count > 0) return;

    // Generamos una promesa multiple para ganar rendimiento
    const values = await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "moderator" }).save(),
      new Role({ name: "admin" }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.error(error);
  }
};
