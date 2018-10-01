"use strict";

require("dotenv").config();

let server;

const express = require('express');
const mongoose = require("mongoose");
const morgan = require("morgan");
// const passport = require("passport");

mongoose.Promise = global.Promise;

const { PORT, DATABASE_URL } = require("./config");

const app = express();

const { router: usersRouter } = require("./users");
// const { router: postsRouter } = require("./posts");
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

app.use(express.static('public'));

app.use("/api/users/", usersRouter);
// app.use("/api/auth/", authRouter);
// app.use("/api/posts/", postsRouter);

// passport.use(localStrategy);
// passport.use(jwtStrategy);

// A protected endpoint which needs a valid JWT to access it
// app.get("/api/protected", jwtAuth, (req, res) => {
//   return res.json({
//     data: "rosebud"
//   });
// });

app.use("*", (req, res) => {
  return res.status(404).json({ message: "Not Found" });
});

function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
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
