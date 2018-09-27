const express = require('express');
const app = express();
app.use(express.static('public'));

let server;

function runServer(port = 8080) {
  return new Promise((resolve, reject) => {
    server = app.listen(port, resolve);
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    server.close(err => {
      if(err) {
        return reject(err);
      }
      resolve();
    });
  });
}

if(require.main === module) {
  runServer(process.env.PORT);
}

module.exports = { app, runServer, closeServer };
