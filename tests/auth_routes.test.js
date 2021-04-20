import mongoose from "mongoose";
import { server } from "../src/server/index";
import { api, initialRoles, cleanRoles } from "./helpers/roles_helpers";
import User from "../src/models/User";

//new user
const joe = {
  username: "Joe",
  email: "joe@gmail.com",
  password: "changeme",
};

beforeAll(async () => {
  await initialRoles();
});

beforeEach(async () => {
  await User.deleteMany({}); //vacio la coleccion
});

describe("Register User POST end point /api/signup", () => {
  test("When registering a new user I receive a status 200", async () => {
    await api
      .post("/api/auth/signup")
      .send({ username: "Joe", email: "joe@gmail.com", password: "changeme" })
      .expect("Content-Type", /application\/json/)
      .expect(200);
  });

  test("Successful registration of a user", async () => {
    let users = await User.find({}).lean(); //search users
    expect(users).toHaveLength(0); //array size 0

    // send end point sing up a joe user
    await api.post("/api/auth/signup").send(joe);

    //search users
    users = await User.find({}, { password: 0 }).lean();
    expect(users).toHaveLength(1); //array size 1

    // user find by email
    const joe_register = await User.findOne(
      { email: "joe@gmail.com" },
      { password: 0 }
    ).lean();
    // joe exists in users collection
    expect(users).toContainEqual(joe_register);
  });

  test("New users have the user role", async () => {
    // send end point sing up
    await api.post("/api/auth/signup").send(joe);
    // user find by email
    const joe_register = await User.findOne({
      email: "joe@gmail.com",
    }).populate("roles");

    expect(joe_register.roles).toContainEqual(
      expect.objectContaining({ name: "user" })
    );
  });
});

describe("Login User POST end point /api/signin", () => {
  test("When a registered user login I receive a status 200 and tokenJwt", async () => {
    // send end point sing up a joe user
    await api.post("/api/auth/signup").send(joe);

    // Login
    const response = await api
      .post("/api/auth/signin")
      .send({ email: "joe@gmail.com", password: "changeme" })
      .expect("Content-Type", /application\/json/)
      .expect(200);
    expect(response.body.tokenJwt).toBeDefined();
  });

  test("When a unregistered user login I receive a status 404", async () => {
    // Login
    const response = await api
      .post("/api/auth/signin")
      .send({ email: "joe@gmail.com", password: "changeme" })
      .expect("Content-Type", /application\/json/)
      .expect(404);
    expect(response.body.message).toBe("User not found");
  });

  test("User error password received message Invalid password", async () => {
    // send end point sing up a joe user
    await api.post("/api/auth/signup").send(joe);

    // Login
    const response = await api
      .post("/api/auth/signin")
      .send({ email: "joe@gmail.com", password: "errorPasword" })
      .expect("Content-Type", /application\/json/)
      .expect(401);
    expect(response.body.message).toBe("Invalid password");
  });
});

afterAll(async () => {
  await User.deleteMany({});
  await cleanRoles();
  server.close();
  mongoose.connection.close();
});
