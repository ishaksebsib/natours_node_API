const express = require("express");
const morgan = require("morgan");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();
app.use(express.json());

// serving static file

app.use(express.static(`${__dirname}/public`));

// 3) Using 3rd person Packges , in this case this morgam packge use to tell us what request is coming
app.use(morgan("dev"));

// Routes

app.get("/", (req, res) => {
  res.status(200).json("Hello World");
});

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
