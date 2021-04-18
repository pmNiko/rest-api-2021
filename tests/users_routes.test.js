import mongoose from "mongoose";
import { server } from "../src/server/index";
import { api, initialRoles, cleanRoles } from "./helpers/roles_helpers";
import User from "../src/models/User";
import Role from "../src/models/Role";
import { newUser } from "./helpers/users_helpers";

beforeAll(async () => {
  await initialRoles();
});

beforeEach(async () => {
  await User.deleteMany({}); //vacio la coleccion
});

describe("GET end point /api/users", () => {
  it('User not logged in receives the message "No token provided."', async () => {
    const response = await api
      .get("/api/users")
      .expect("Content-Type", /application\/json/);
    expect(response.status).toEqual(403);
    expect(response.body.message).toBe("No token provided.");
  });

  it("To list the users with invalid token", async () => {
    const response = await api
      .get("/api/users")
      .set("x-access-token", "invalidToken")
      .expect("Content-Type", /application\/json/);
    expect(response.status).toEqual(401);
    expect(response.body.message).toBe("Unauthorized");
  });

  it('User with user role receive message "Require admin role."', async () => {
    await newUser("Joe", "joe@gmail.com", "changeme", "user");
    const res = await api
      .post("/api/auth/signin")
      .send({ email: "joe@gmail.com", password: "changeme" });

    const tokenJwt = res.body.tokenJwt;

    const response = await api
      .get("/api/users")
      .set("x-access-token", tokenJwt)
      .expect("Content-Type", /application\/json/);
    expect(response.status).toEqual(403);
    expect(response.body.message).toBe("Require admin role.");
  });

  it("To list the users must be admin", async () => {
    const users = await User.find().lean();

    expect(users).toHaveLength(0);

    await newUser("Administrator", "admin@gmail.com", "passwordAdmin", "admin");

    const res = await api
      .post("/api/auth/signin")
      .send({ email: "admin@gmail.com", password: "passwordAdmin" });

    const tokenJwt = res.body.tokenJwt;

    const response = await api
      .get("/api/users")
      .set("x-access-token", tokenJwt)
      .expect("Content-Type", /application\/json/);
    expect(response.status).toEqual(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.data).toHaveLength(1);
  });
});

describe("POST end point /api/users", () => {
  it('User not logged in receives the message "No token provided."', async () => {
    const response = await api
      .post("/api/users")
      .expect("Content-Type", /application\/json/);
    expect(response.status).toEqual(403);
    expect(response.body.message).toBe("No token provided.");
  });

  it("To list the users with invalid token", async () => {
    const response = await api
      .post("/api/users")
      .set("x-access-token", "invalidToken")
      .expect("Content-Type", /application\/json/);
    expect(response.status).toEqual(401);
    expect(response.body.message).toBe("Unauthorized");
  });

  it('User with user role receive message "Require admin role."', async () => {
    await newUser("Joe", "joe@gmail.com", "changeme", "user");

    const res = await api
      .post("/api/auth/signin")
      .send({ email: "joe@gmail.com", password: "changeme" });

    const tokenJwt = res.body.tokenJwt;

    const response = await api
      .post("/api/users")
      .set("x-access-token", tokenJwt)
      .expect("Content-Type", /application\/json/);
    expect(response.status).toEqual(403);
    expect(response.body.message).toBe("Require admin role.");
  });
});

afterAll(async () => {
  await User.deleteMany({});
  await cleanRoles();
  server.close();
  mongoose.connection.close();
});
