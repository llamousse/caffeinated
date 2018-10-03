"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");
const jwt = require("jsonwebtoken");

const { app, runServer, closeServer } = require("../server");
const { User } = require("../users");
const { JWT_SECRET, TEST_DATABASE_URL } = require("../config");

const expect = chai.expect;

chai.use(chaiHttp);

describe("Auth routes", function() {
  const email = "admin@test.com";
  const password = "pass123123";

  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return User.hashPassword(password).then(password =>
      User.create({
        email,
        password
      })
    );
  });

  after(function() {
    return closeServer();
  });

  afterEach(function() {
    return User.deleteMany({});
  });

  describe("/api/auth/login", function() {
    it("Should not pass if nothing is filled out", function() {
      return chai
        .request(app)
        .post("/api/auth/login")
        .then(res => {
          expect(res).to.have.status(400);
        });
    });

    it("Should not pass if password is not completed", function() {
      return chai
        .request(app)
        .post("/api/auth/login")
        .send({ email, password: null })
        .catch(function(err) {
          expect(err.response).to.have.status(400);
        });
    });

    it("Should not pass if the email starts with a space", function() {
      return chai
        .request(app)
        .post("/api/auth/login")
        .send({ email: " ", password })
        .catch(function(err) {
          expect(err.response).to.have.status(401);
        });
    });

    it("Should not pass if email is not a non-string", function() {
      return chai
        .request(app)
        .post("/api/auth/login")
        .send({ email: 123, password })
        .catch(function(err) {
          expect(err.response).to.have.status(401);
        });
    });

    it("Should not pass with incorrect email", function() {
      return chai
        .request(app)
        .post("/api/auth/login")
        .send({ email: "wrongEmail", password })
        .then(res => {
          expect(res).to.have.status(401);
        });
    });

    it("Should not pass with incorrect password", function() {
      return chai
        .request(app)
        .post("/api/auth/login")
        .send({ email, password: "wrongPassword" })
        .then(res => {
          expect(res).to.have.status(401);
        });
    });

    it("Should return a valid auth token", function() {
      return chai
        .request(app)
        .post("/api/auth/login")
        .send({ email, password })
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          const token = res.body.authToken;
          expect(token).to.be.a("string");
          const payload = jwt.verify(token, JWT_SECRET, {
            algorithm: ["HS256"]
          });
          expect(payload.user).to.deep.equal({
            email,
            id: payload.user.id
          });
        });
    });
  });

  describe("/api/auth/refresh", function() {
    it("Should not pass with no credentials", function() {
      return chai
        .request(app)
        .post("/api/auth/refresh")
        .then(res => {
          expect(res).to.have.status(401);
        });
    });
    it("Should not pass with an invalid token", function() {
      const token = jwt.sign(
        {
          email
        },
        "wrongSecret",
        {
          algorithm: "HS256",
          expiresIn: "7d"
        }
      );

      return chai
        .request(app)
        .post("/api/auth/refresh")
        .set("Authorization", `Bearer ${token}`)
        .then(res => {
          expect(res).to.have.status(401);
        });
    });

    it("Should return a valid auth token with a newer expiry date", function() {
      const token = jwt.sign(
        {
          user: {
            email
          }
        },
        JWT_SECRET,
        {
          algorithm: "HS256",
          subject: email,
          expiresIn: "7d"
        }
      );
      const decoded = jwt.decode(token);

      return chai
        .request(app)
        .post("/api/auth/refresh")
        .set("authorization", `Bearer ${token}`)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          const token = res.body.authToken;
          expect(token).to.be.a("string");
          const payload = jwt.verify(token, JWT_SECRET, {
            algorithm: ["HS256"]
          });
          expect(payload.user).to.deep.equal({
            email
          });
          expect(payload.exp).to.be.at.least(decoded.exp);
        });
    });
  });
});
