const gravatar = require("gravatar");
const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();

const app = require("../../app");
const { User } = require("../../models");

const { DB_HOST_TEST, PORT } = process.env;

describe("test auth routes", () => {
  let server;
  beforeAll(() => (server = app.listen(PORT)));
  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(DB_HOST_TEST).then(() => done());
  });

  afterEach((done) => {
    User.collection.drop(() => {
      mongoose.connection.close(() => done());
    });
  });

  test("test signup route", async () => {
    const newUser = new User({
      email: "testUser@gmail.com",
      password: "qwerty",
      avatarURL: gravatar.url(this.email),
    });

    newUser.setPassword(newUser.password);

    const signupUser = {
      email: "testUser@gmail.com",
      password: "qwerty",
    };

    const response = await request(app)
      .post("/api/auth/signup")
      .send(signupUser);
    const { user } = response.body.data;
    const { email, avatarURL } = user;
    expect(response.statusCode).toBe(201);
    expect(typeof email).toBe("string");
    expect(typeof avatarURL).toBe("string");
  });

  test("test login route", async () => {
    const newUser = new User({
      email: "user@gmail.com",
      password: "qwerty",
      avatarURL: gravatar.url(this.email),
    });

    newUser.setPassword(newUser.password);

    const user = await User.create(newUser);

    const loginUser = {
      email: "user@gmail.com",
      password: "qwerty",
    };

    const response = await request(app).post("/api/auth/login").send(loginUser);
    expect(response.statusCode).toBe(200);
    const { body } = response;
    const { email, subscription } = body.user;
    expect(typeof email).toBe("string");
    expect(typeof subscription).toBe("string");
    expect(body.token).toBeTruthy();
    const { token } = await User.findById(user._id);
    expect(body.token).toBe(token);
  });
});
