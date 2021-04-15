import mongoose from "mongoose";
import { server } from "../src/server/index";
import Role from "../src/models/Role";
import { api, initialRoles, getRoles } from "./helpers/roles_helpers";

beforeAll(async () => {
  await Role.deleteMany({}); //vacio la coleccion
});

describe("GET of api roles", () => {
  test("Expect return status 200 get /api/roles", async () => {
    await api
      .get("/api/roles")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

describe("Creation of default roles", () => {
  test("There are three roles when starting the server", async () => {
    let roles = await getRoles();
    expect(roles).toHaveLength(0);

    initialRoles();
    const rolesInsert = await getRoles();

    expect(rolesInsert).toHaveLength(roles.length + 3);
    expect(rolesInsert).toHaveLength(3);
  });

  test("Role admin exists", async () => {
    const adminRole = await getRoles(0);
    expect(adminRole.name).toBe("admin");
  });

  test("Role moderator exists", async () => {
    const moderatorRole = await getRoles(1);
    expect(moderatorRole.name).toBe("moderator");
  });

  test("Role user exists", async () => {
    const userRole = await getRoles(2);
    expect(userRole.name).toBe("user");
  });
});

afterAll(() => {
  server.close();
  mongoose.connection.close();
});
