const fs = require("fs");
const express = require("express");

const app = express();

// Midlle ware to convert data to json

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//  GET ALL ALL TOURS

app.get("/", (req, res) => {
  res.status(200).json("Hello from the server side!");
});

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
});

// GET TOUR BY ID

app.get("/api/v1/tours/:id", (req, res) => {
  // geting the id from url params and converting it to inteiger

  const id = req.params.id * 1;

  // chake if the id is valid or exists in our data

  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  // find the tour by the id we get

  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
});

// CREATE NEW TOUR

app.post("/api/v1/tours", (req, res) => {
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
});

// START THE SERVER

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port} ...`);
});
