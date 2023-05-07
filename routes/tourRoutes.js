const express = require("express");
const {
  getAllTours,
  createNewTour,
  getTourById,
  updateTour,
  deleteTour,
  checkID,
  checkBody,
} = require("./../controllers/tourContorller");

const router = express.Router();

// middle ware for url params only

// router.param("id");

router.route("/").get(getAllTours).post(createNewTour);

router.route("/:id").get(getTourById).patch(updateTour).delete(deleteTour);

module.exports = router;
