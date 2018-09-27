"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");

const expect = chai.expect;

var server = require('../server');

describe('server', function () {
  before(function () {
    server.listen(8080);
  });

  after(function () {
    server.close();
  });
});

var http = require('http');

describe('/', function () {
  it('should return 200', function () {
    http.get('http://localhost:8080', function (res) {
      expect(res).to.have.status(200);
    });
  });
});
