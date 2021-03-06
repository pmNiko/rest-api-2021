import { app } from "../../src/server/index";
import supertest from "supertest";
import Role from "../../src/models/Role";

export const api = supertest(app);

const roles = [{ name: "admin" }, { name: "moderator" }, { name: "user" }];

// Promise all hace la ejecucion en paralelo no hay control de la secuencia de guardado
// export const initialRoles = async () =>
//   await Promise.all([
//     new Role({ name: "admin" }).save(),
//     new Role({ name: "moderator" }).save(),
//     new Role({ name: "user" }).save(),
//   ]);

// ejecución secuencial
export const initialRoles = async () => {
  for (const role of roles) {
    await new Role(role).save();
  }
};

// devuelve el rol segun el indice que recibe como parametro o el array completo
export const getRoles = async (index) => {
  const response = await api.get("/api/roles");
  return index != undefined ? response.body.data[index] : response.body.data;
};

// vaciar la coleccion de roles
export const cleanRoles = async () => {
  await Role.deleteMany({});
};
