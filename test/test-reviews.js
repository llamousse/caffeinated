"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");
const faker = require("faker");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const { app, runServer, closeServer } = require("../server");
const { Review } = require("../reviews");
const { User } = require("../users");
const { JWT_SECRET, TEST_DATABASE_URL } = require("../config");

const email = "test@gmail.com";
const password = "pass123123";

const should = chai.should();

chai.use(chaiHttp);

let token;

function tearDownDb() {
  return new Promise((resolve, reject) => {
    console.warn("Deleting database");
    mongoose.connection
      .dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

function seedReviewData() {
  console.info("seeding review data");
  const seedData = [];
  for (let i = 1; i <= 10; i++) {
    seedData.push({
      title: faker.lorem.sentence(),
      date: Date.now(),
      description: faker.lorem.text()
    });
  }
  // console.log(seedData);
  return Review.insertMany(seedData);
}

describe("/api/reviews", function() {
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return User.hashPassword(password).then(password =>
			User.create({
				email,
				password
			})
			).then( () => {
				return seedReviewData();
			}).then(() => {
				token = jwt.sign(
				{
					user: {
						email
					}
				},
				JWT_SECRET,
				{
					algorithm: 'HS256',
					subject: email,
					expiresIn: '7d'
				}
				);
			})
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

  describe("GET endpoint", function() {
    it("should return all existing reviews", function() {
      let res;
      return chai
        .request(app)
        .get("/api/reviews")
  			.set('Authorization', `Bearer ${token}`)
        .then(_res => {
          res = _res;
          res.should.have.status(200);
          res.body.should.have.lengthOf.at.least(1);
          return Review.countDocuments();
        })
        .then(count => {
          res.body.should.have.lengthOf(count);
        });
    });

    it("should return reviews with right fields", function() {

      let resReview;

      return chai
        .request(app)
        .get("/api/reviews")
        .set('Authorization', `Bearer ${token}`)
        .then(function(res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("array");
          res.body.should.have.lengthOf.at.least(1);

          // console.log(res.body); //THIS LETS YOU SEE THE REVIEWS IN THE CONSOLE

          res.body.forEach(function(review) {
            review.should.be.a("object");
            review.should.include.keys("title", "date", "description", "id");
          });

          resReview = res.body[0];
          return Review.findById(resReview.id);

        })
        .then(function(review) {
          resReview.title.should.equal(review.title);
          resReview.description.should.equal(review.description);
        });
    });

  });

  describe("POST endpoint", function() {
    it("should add a new review", function() {
      const newReview = {
        title: "this is a review",
        description: "test test test",
        date: Date.now()
      };

      return chai
        .request(app)
        .post("/api/reviews")
        .set('Authorization', `Bearer ${token}`)
        .send(newReview)
        .then(function(res) {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.include.keys("title", "date", "description", "id");
          res.body.title.should.equal(newReview.title);
          res.body.id.should.not.be.null;
          res.body.description.should.equal(newReview.description);
          return Review.findById(res.body.id);
        })
        .then(function(review) {
          review.title.should.equal(newReview.title);
          review.description.should.equal(newReview.description);
        });
    });
  });

  describe("PUT endpoint", function() {
    it("should update fields you send over", function() {
      const updateData = {
        title: "cats cats cats",
        description: "dogs dogs dogs",
        date: Date.now()
      };

      return Review.findOne()
        .then(review => {
          updateData.id = review.id;

          return chai
            .request(app)
            .put(`/api/reviews/${review.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updateData);
        })
        .then(res => {
          res.should.have.status(204);
          return Review.findById(updateData.id);
        })
        .then(review => {
          review.title.should.equal(updateData.title);
          review.description.should.equal(updateData.description);
        });
    });
  });

  describe("DELETE endpoint", function() {
    it("should delete a review by id", function() {
      let review;

      return Review
			.findOne()
			.then(review => review = review.id)

      return chai
        .request(app)
        .get(`/api/reviews/${review.id}`)
        .set('Authorization', `Bearer ${token}`)

			.then(res => {
				return chai.request(app)
				.delete(`/api/reviews/${review}`)
			})
			.then(res => {
				expect(res).to.have.status(204);
				return Review.findById(review);
			})
			.then(review => {
				expect(review).to.be.null;
			});
    });
  });
});
