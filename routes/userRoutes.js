const express = require("express");

const createUser = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "comming soon",
  });
};

const getUser = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "comming soon",
  });
};

const updateUser = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "comming soon",
  });
};

const deleteUser = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "comming soon",
  });
};

const route = express.Router();

route.route("/api/v1/users").get(getAllUsers).post(createUser);
route
  .route("/api/v1/users/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

const getAllUsers = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "comming soon",
  });
};

module.exports(route);
