'use strict';

const chai = require('chai');
const chaiHttp = require("chai-http");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const { app, runServer, closeServer } = require("../server");
const { User } = require("../users");
const { TEST_DATABASE_URL } = require("../config");

const expect = chai.expect;

chai.use(chaiHttp);

describe("/api/user", function() {
  const email = "admin@test.com";
  const password = "pass123123";
  const emailB = "admin2@test.com";
  const passwordB = "pass123123123";

  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return User.deleteMany({});
  });

  after(function() {
    return closeServer();
  });

  afterEach(function() {
    return User.deleteMany({});
  });

  describe("/api/users", function() {
    describe("POST", function() {
      it("Should reject users with missing email", function() {
        return chai
          .request(app)
          .post("/api/users")
          .send({
            password
          })

          .then(res => {
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal("ValidationError");
            expect(res.body.message).to.equal("Missing field");
            expect(res.body.location).to.equal("email");
          });
      });
      it("Should reject users with missing password", function() {
        return chai
          .request(app)
          .post("/api/users")
          .send({
            email
          })
          .then(res => {
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal("ValidationError");
            expect(res.body.message).to.equal("Missing field");
            expect(res.body.location).to.equal("password");
          });
      });
      it("Should reject users with non-string email", function() {
        return chai
          .request(app)
          .post("/api/users")
          .send({
            email: 1234,
            password
          })

          .then(res => {
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal("ValidationError");
            expect(res.body.message).to.equal(
              "Incorrect field type: expected string"
            );
            expect(res.body.location).to.equal("email");
          });
      });
      it("Should reject users with non-string password", function() {
        return chai
          .request(app)
          .post("/api/users")
          .send({
            email,
            password: 1234
          })
          .then(res => {
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal("ValidationError");
            expect(res.body.message).to.equal(
              "Incorrect field type: expected string"
            );
            expect(res.body.location).to.equal("password");
          });
      });
      it("Should reject users with non-trimmed email", function() {
        return chai
          .request(app)
          .post("/api/users")
          .send({
            email: ` ${email} `,
            password
          })
          .then(res => {
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal("ValidationError");
            expect(res.body.message).to.equal(
              "Cannot start or end with whitespace"
            );
            expect(res.body.location).to.equal("email");
          });
      });
      it("Should reject users with non-trimmed password", function() {
        return chai
          .request(app)
          .post("/api/users")
          .send({
            email,
            password: ` ${password} `
          })
          .then(res => {
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal("ValidationError");
            expect(res.body.message).to.equal(
              "Cannot start or end with whitespace"
            );
            expect(res.body.location).to.equal("password");
          });
      });
      it("Should reject users with empty email", function() {
        return chai
          .request(app)
          .post("/api/users")
          .send({
            email: "",
            password
          })
          .then(res => {
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal("ValidationError");
            expect(res.body.message).to.equal(
              "Must be at least 1 characters long"
            );
            expect(res.body.location).to.equal("email");
          });
      });
      it("Should reject users with password less than ten characters", function() {
        return chai
          .request(app)
          .post("/api/users")
          .send({
            email,
            password: "12345678"
          })
          .then(res => {
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal("ValidationError");
            expect(res.body.message).to.equal(
              "Must be at least 10 characters long"
            );
            expect(res.body.location).to.equal("password");
          });
      });
      it("Should reject users with password greater than 72 characters", function() {
        return chai
          .request(app)
          .post("/api/users")
          .send({
            email,
            password: new Array(73).fill("a").join("")
          })
          .then(res => {
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal("ValidationError");
            expect(res.body.message).to.equal(
              "Must be at most 72 characters long"
            );
            expect(res.body.location).to.equal("password");
          });
      });
      it("Should reject users with duplicate email", function() {
        // Create an initial user
        return User.create({
          email,
          password
        })
          .then(() =>
            // Try to create a second user with the same email
            chai
              .request(app)
              .post("/api/users")
              .send({
                email,
                password
              })
          )
          .then(res => {
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal("ValidationError");
            expect(res.body.message).to.equal("Email already taken");
            expect(res.body.location).to.equal("email");
          });
      });
      it("Should create a new user", function() {
        this.timeout(15000);

        return chai
          .request(app)
          .post("/api/users/")
          .send({
            email,
            password
          })
          .then(res => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.keys("email", "id");
            expect(res.body.email).to.equal(email);
            return User.findOne({
              email
            });
          })
          .then(user => {
            expect(user).to.not.be.null;
            return user.validatePassword(password);
          })
          .then(passwordIsCorrect => {
            expect(passwordIsCorrect).to.be.true;
          });
      });
    });
  });
});
