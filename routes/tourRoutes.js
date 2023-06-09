const express = require("express");
const {
  getAllTours,
  createNewTour,
  getTourById,
  updateTour,
  deleteTour,
  checkID,
  checkBody,
  aliasTopTours,
} = require("./../controllers/tourContorller");

const router = express.Router();

// middle ware for url params only

// router.param("id");

router.route("/top-5-cheap").get(aliasTopTours, getAllTours);

router.route("/").get(getAllTours).post(createNewTour);

router.route("/:id").get(getTourById).patch(updateTour).delete(deleteTour);

module.exports = router;
