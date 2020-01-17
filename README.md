# Overview
The project was built with React and Express Server that allows users detect faces in a photo.

(Demo without Redis, JWT, profile: https://face-detection-appa.herokuapp.com/)

# Features
- Clarifai face recognition api.

- Signin and Register with JWT authentication.

- Personal profile

- Storing data on PostgreSQL and Redis

# Setup & Installation
1.you will need a redis server and a postgreSQL server running on your machine for this to work.

2.Clone this repo

3.Run npm install

4.Run npm start

5.You must add your own API key in the controllers/image.js file to connect to Clarifai API.

# Roadmap
- Dockerizing the back-end
- Circle CI


