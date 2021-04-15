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

export const getRoles = async (index) => {
  const response = await api.get("/api/roles");
  const data = response.body.data;
  return index != undefined ? data[index] : data;
};
