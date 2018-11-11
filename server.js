"use strict";

require("dotenv").config();

const yelp = require("yelp-fusion");
const client = yelp.client(
  "My4Qn7b3BQGwqQaY5XL7eS2eMvBgik7So0fyleJUTeNJ24YRoeCTs0e8vSF7scVrPUSkQ7dnrvfUnsP_Gt3nL_qOENlTGUVPwG4t4qCVM48DuPOSp05iDuRouv3MWnYx"
);

let server;

const express = require('express');
const mongoose = require("mongoose");
const morgan = require("morgan");
// const passport = require("passport");

mongoose.Promise = global.Promise;

const { PORT, DATABASE_URL } = require("./config");

const app = express();

//const jwtAuth = passport.authenticate("jwt", { session: false });

const { router: usersRouter } = require("./users");
const { router: reviewsRouter } = require("./reviews");
// const { router: authRouter, localStrategy, jwtStrategy } = require("./auth");

// Logging
app.use(morgan('common'));

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  if (req.method === "OPTIONS") {
    return res.send(204);
  }
  next();
});

app.use(express.static('build'));

app.use("/api/users/", usersRouter);
app.use("/api/reviews/", reviewsRouter);
// app.use("/api/auth/", authRouter);

// passport.use(localStrategy);
// passport.use(jwtStrategy);

// A protected endpoint which needs a valid JWT to access it

// app.post("review")
app.get("/reviews", (req, res) => {
  return res.json({
    review: req.params.review
  });
});

// app.post("/reviews", (req, res) => {
//   const requiredFields = ["review"];
//   if(!requiredFields) {
//     const message = `Missing \`${requiredFields}\` in request body`;
//     console.error(message);
//     return res.status(400).send(message);
//   }
//
//   Review.create({
//     review: req.body.review
//     // ,
//     // location: req.body.location
//     })
//
//     .then(Review => res.status(201).json(Review.serialize()))
//     .catch(err => {
//       console.error(err);
//       res.status(500).json({ error: "something went wrong" });
//   });
// });

app.get("/api/protected", (req, res) => {
  return res.json({
    data: "rosebud"
  });
});

app.get("/yelp-search", function(req, res) {
  console.log(req.query);
  console.log(req.params);
  client
    .search({
      //term: req.term, //one of the selected item
      term: req.query.term,
      // categories: req.query.categories,
      // categories: "bubbletea" || "coffee",
      location: req.query.location || "san francisco, ca" //require OR longitude&latitude
    })
    .then(response => {
      console.log(response.jsonBody);
      res.send(response.jsonBody);
    })
    .catch(e => {
      console.log(e);
    });
});

app.use("*", (req, res) => {
  return res.status(404).json({ message: "Not Found" });
});

function runServer(databaseUrl, port = PORT) {
  console.log("server is runnning")
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, { useNewUrlParser: true }, err => {
      if (err) {
        return reject(err);
      }
      server = app
        .listen(port, resolve)
        .on("error", err => {
          mongoose.disconnect();
          reject(err);
        })
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      server.close(err => {
        if(err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if(require.main === module) {
  runServer(DATABASE_URL, process.env.PORT);
}

module.exports = { app, runServer, closeServer };
