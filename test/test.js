"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const expect = chai.expect;

const { app, runServer, closeServer } = require('../server');

describe('server', function () {
  before(function () {
    return runServer();
  });

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
