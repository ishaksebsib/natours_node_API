const Tour = require("../models/tourModel");

exports.checkBody = (req, res, next) => {
  const { name, price } = req.body;
  console.log(name, price, "boddys");

  if (!name || !price) {
    return res.status(400).json({
      status: "bad request",
      message: "name and price required",
    });
  }

  next();
};

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

exports.createNewTour = (req, res) => {
  // const newId = tours[tours.length - 1].id + 1;
  // const newTour = Object.assign({ id: newId }, req.body);
  // tours.push(newTour);
  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => {
  //     res.status(201).json({
  //       status: "success",
  //       data: {
  //         tour: newTour,
  //       },
  //     });
  //   }
  // );
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
