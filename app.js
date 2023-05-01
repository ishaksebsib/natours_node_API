const express = require("express");
const morgan = require("morgan");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// 1) builtin Midlle ware to convert data to json

app.use(express.json());

// 2) coustom middle ware

app.use((req, res, next) => {
  // this the code below will be accecable on every single route

  req.requestTime = new Date().toISOString();

  console.log("Hello i am from MiddleWare :)");
  next();
});

// 3) Using 3rd person Packges , in this case this morgam packge use to tell us what request is coming

app.use(morgan("dev"));

// Routes

app.get("/", (req, res) => {
  res.status(200).json("Hello World");
});

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
