import request from "supertest";
import app from "../app";

describe("GET /", () => {
  it("should return 201 CREATED", () => {
    return request(app).post("/api-v1/users/signup").send({
      firstName: "abc",
      lastName : "xyz",
      email : "abcxyz@example.com",
      password : "1234",
      confirmPassword : "1234"
    }).expect(201);
  });
})