const fs = require("fs");
const express = require("express");
const morgan = require("morgan");

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

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
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

// tour funcitons

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

// user functions

const getAllUsers = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "comming soon",
  });
};

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

// HOME PAGE

app.get("/", (req, res) => {
  res.status(200).json("Hello from the server side!");
});

// Routes

const tourRouter = express.Router();
app.use("/api/v1/tours", tourRouter);

tourRouter.route("/").get(getAllTours).post(createNewTour);

tourRouter.route("/:id").get(getTourById).patch(updateTour).delete(deleteTour);

const userRouter = express.Router();
app.use("/api/v1/users", userRouter);

userRouter.route("/api/v1/users").get(getAllUsers).post(createUser);

userRouter
  .route("/api/v1/users/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

// START THE SERVER

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port} ...`);
});
