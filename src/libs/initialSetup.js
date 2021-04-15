import Role from "../models/Role";

export const createRoles = async () => {
  try {
    // devuelve la cantidad de documentos existentes del
    const roles = await Role.estimatedDocumentCount();

    //Si no existen roles crea roles por defecto
    if (!roles && process.env.NODE_ENV != "test") {
      // Generamos una promesa multiple para ganar rendimiento
      const values = await Promise.all([
        new Role({ name: "user" }).save(),
        new Role({ name: "moderator" }).save(),
        new Role({ name: "admin" }).save(),
      ]);

      console.log(values);
    }
  } catch (error) {
    console.log(error);
  }
};
