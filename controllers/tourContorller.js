const Tour = require("../models/tourModel");

exports.getAllTours = async (req, res) => {
  try {
    // BUILD QUERY

    const queryObj = { ...req.query };

    // 1) FILITERING

    const excludedFields = ["page", "sort", "list", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 2) ADVANCED FILLITERING

    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`); // THIS CODE REPLACES THE STANDARD QUERY LIKE { duration: { gte: '4' } } THIS TO THE MONGOOSE FORMAT {"duration":{"$gte":"4"}}

    let query = Tour.find(JSON.parse(queryStr)); // prepare the query string

    // 3) SORTING

    //   example http://localhost:8080/api/v1/tours/?sort=-price OR  http://localhost:8080/api/v1/tours/?sort=price

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      //   -- IF USER DO NOT APPLY THE SORT ON URL  THIS EALSE FUNCTION WILL BE APPLYED SO THAT IT RETURN THE DATA BY LIST CREATED

      query = query.sort("-createdAt");
    }

    // 4) FIELD LIMITING

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }
    // EXECUTE QUERY

    const tours = await query;
    res.status(200).json({
      status: "success",
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
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

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      message: tour,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
