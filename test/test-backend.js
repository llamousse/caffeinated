'use strict';

const chai = require("chai");
const chaiHttp = require("chai-http");
const faker = require("faker");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const expect = chai.expect;
chai.use(chaiHttp);

const { app, runServer, closeServer } = require('../server');
const { JWT_SECRET, TEST_DATABASE_URL } = require("../config");

function tearDownDb() {
  return new Promise((resolve, reject) => {
    console.warn("Deleting database");
    mongoose.connection
      .dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}



describe('server', function () {
  before(function () {
    return runServer(TEST_DATABASE_URL);
  });

  //beforeEach(function)

  // afterEach(function() {
  //   return tearDowndb();
  // });

  after(function () {
    return closeServer();
  });

  describe('/', function () {
    it('should return 200', function () {
      return chai
        .request(app)
        .get("/")
        .then((res) => {
          expect(res).to.have.status(200);
        });
    });
  });

});
