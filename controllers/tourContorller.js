const Tour = require("../models/tourModel");

exports.getAllTours = (req, res) => {
  // res.status(200).json({
  //   status: "success",
  //   results: tours.length,
  //   data: {
  //     tours,
  //   },
  // });
};

exports.getTourById = (req, res) => {
  // // geting the id from url params and converting it to inteiger
  // const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id === id);
  // res.status(200).json({
  //   status: "success",
  //   data: {
  //     tour,
  //   },
  // });
};

exports.createNewTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: "success",
    message:
      "updating data looks like this this is a demo of how api works letter on when we use real data we well see in detail",
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: "success",
    data: null,
    message:
      "updating data looks like this this is a demo of how api works letter on when we use real data we well see in detail",
  });
};
