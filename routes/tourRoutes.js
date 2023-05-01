const fs = require("fs");
const express = require("express");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTourById = (req, res) => {
  // geting the id from url params and converting it to inteiger

  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  // chake if the id is valid or exists in our data

  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  // find the tour by the id we get

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};

const createNewTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  res.status(200).json({
    status: "success",
    message:
      "updating data looks like this this is a demo of how api works letter on when we use real data we well see in detail",
  });
};

const deleteTour = (req, res) => {
  res.status(204).json({
    status: "success",
    data: null,
    message:
      "updating data looks like this this is a demo of how api works letter on when we use real data we well see in detail",
  });
};

const router = express.Router();

router.route("/").get(getAllTours).post(createNewTour);

router.route("/:id").get(getTourById).patch(updateTour).delete(deleteTour);

module.exports(router);
