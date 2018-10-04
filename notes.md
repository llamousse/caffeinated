To start server: node server.js

To develop react app: react-scripts start

To bundle react app: react-scripts build

To develop the server: nodemon server.js

- Heroku needs npm start to start server
- Heroku in this situation needs the bundle

Public folder - just for developing
Build folder - for production

Using server to statically host the build folder


Heroku Process:
1. git push heroku master
2. heroku does npm install
- (manual) create build
3. if works, tries to start (npm start)
4. otherwise, 3 doesn't run
