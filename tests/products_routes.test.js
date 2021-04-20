import mongoose from "mongoose";
import { server } from "../src/server/index";
import { api, initialRoles, cleanRoles } from "./helpers/roles_helpers";
import { newUser } from "./helpers/users_helpers";
import User from "../src/models/User";
import Product from "../src/models/Product";

beforeAll(async () => {
  await initialRoles();
  await newUser("Administrator", "admin@gmail.com", "passwordAdmin", "admin");
  await newUser("Joe", "joe@gmail.com", "changeme", "user");
});

beforeEach(async () => {
  await Product.deleteMany({}); //vacio la coleccion
});

describe("POST end point /api/products", () => {
  it('User not logged in receives status 403 the message "No token provided."', async () => {
    const response = await api
      .post("/api/products")
      .expect("Content-Type", /application\/json/);
    expect(response.status).toEqual(403);
    expect(response.body.message).toBe("No token provided.");
  });

  it('User with invalid token status 401 receives the message "Unauthorized"', async () => {
    const response = await api
      .post("/api/products")
      .set("x-access-token", "invalidToken")
      .expect("Content-Type", /application\/json/);
    expect(response.status).toEqual(401);
    expect(response.body.message).toBe("Unauthorized");
  });

  it('User with user role receive status 403 message "Require admin role."', async () => {
    const res = await api
      .post("/api/auth/signin")
      .send({ email: "joe@gmail.com", password: "changeme" });

    const tokenJwt = res.body.tokenJwt;

    const response = await api
      .post("/api/products")
      .set("x-access-token", tokenJwt)
      .expect("Content-Type", /application\/json/);
    expect(response.status).toEqual(403);
    expect(response.body.message).toBe("Require admin role.");
  });

  it("To create product must be admin", async () => {
    const res = await api
      .post("/api/auth/signin")
      .send({ email: "admin@gmail.com", password: "passwordAdmin" });

    const tokenJwtAdmin = res.body.tokenJwt;

    const response = await api
      .post("/api/products")
      .set("x-access-token", tokenJwtAdmin)
      .set("Content-Type", "application/json")
      .send({
        name: "laptop Acer",
        price: "700.90",
        category: "laptop",
        imgURL:
          "https://images-na.ssl-images-amazon.com/images/I/81mIXd99GrL._AC_SL1500_.jpg",
      })
      .expect("Content-Type", /application\/json/);
    expect(response.status).toEqual(200);
    expect(response.body.data).toBeDefined();
  });
});

afterAll(async () => {
  await Product.deleteMany({});
  await User.deleteMany({});
  await cleanRoles();
  server.close();
  mongoose.connection.close();
});
