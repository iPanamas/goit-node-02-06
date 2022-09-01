const express = require("express");
const request = require("supertest");

const signup = require("./signup");
const app = express();

app.post("/api/auth/signup", signup);

describe("test signup controller", () => {
  beforeAll(() => app.listen(3000));

  test("return status code 200", async () => {
    const body = {
      email: "user1@gmail.com",
      password: "qwertyu",
      subscription: false,
    };
    const { email, password, subscription } = body;
    const response = await request(app)
      .post("/api/auth/signup")
      .send(email, password, subscription);

    console.log(response.status);
  });
});

// ответ должен иметь статус-код 200
// в ответе должен возвращаться токен
// в ответе должен возвращаться объект user с 2 полями email и subscription, имеющие тип данных String
