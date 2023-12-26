// import { config } from "dotenv";
// config();
// const express= require("express");
// const mongoose=require("mongoose");
// const spiningRoute=require("./spiningTop");
// const app=express();
// const mongoURI = process.env.DB_CONNECTION || "mongodb://localhost:27017/spining";
// mongoose.connect(mongoURI)
//     .then((suc) => { console.log("mongo db connected sucessfully!!!", suc.connection.host) })
//     .catch(err => {
//         console.log("cannot connect mongoDB")
//         console.log(err)
//         process.exit(1);
//     })
// app.use("/spiningTop",spiningRoute);
// app.use(express.json());

// let port = process.env.PORT || 4000;
// app.listen(port, () => {
//     console.log(`app is listening on port ${port}`)
// })

const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const spiningRoute = require('./spiningTop');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});


const mongoURI = process.env.DB_CONNECTION || 'mongodb://0.0.0.0:27017/spining';

mongoose.connect(mongoURI)
  .then((suc) => {
    console.log('MongoDB connected successfully!!!', suc.connection.host);
  })
  .catch((err) => {
    console.log('Unable to connect to MongoDB');
    console.log(err);
    process.exit(1);
  });

app.use('/spiningTop', spiningRoute);
app.use(express.json());

let port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});



// const dotenv = require('dotenv');
// dotenv.config();

// const express = require('express');
// const mongoose = require('mongoose');
// const spiningRoute = require('./spiningTop');

// const app = express();

// // Middleware to parse JSON bodies
// app.use(express.json());

// // Middleware for logging incoming requests
// app.use((req, res, next) => {
//   console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
//   next();
// });

// // Connect to MongoDB
// const mongoURI = process.env.DB_CONNECTION || 'mongodb://0.0.0.0:27017/spining';
// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('MongoDB connected successfully!');
//   })
//   .catch((err) => {
//     console.error('Unable to connect to MongoDB:');
//     console.error(err);
//     process.exit(1);
//   });

// // Routes
// app.use('/spiningTop', spiningRoute);

// // Start the server
// const port = process.env.PORT || 4000;
// app.listen(port, () => {
//   console.log(`App is listening on port ${port}`);
// });






