const mongoose = require("mongoose");

// connect the db

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("DB Connected!!!");
  });

// BULDING THE SECHEMA

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A TORU MUST HAVE A NAME !!!"],
    trim: true,
    unique: true,
  },
  duration: {
    type: Number,
    required: [true, "A TORU MUST HAVE A DURATION !!!"],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "A TORU MUST HAVE A MAX GROUP SIZE !!!"],
  },
  difficulty: {
    type: String,
    required: [true, "A TORU MUST HAVE A DIFFICULTY !!!"],
  },
  ratingsAvrage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "A TOUR MUST HAVE A PRICE !!!"],
  },
  priceDiscount: { type: Number },
  summary: {
    type: String,
    trim: true,
    required: [true, " A TOUR MUST HAVE A SUMMARY   "],
  },

  descritption: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, " A TROU MUST HAVE A COVER IMAGE"],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDate: {
    type: Date,
  },
});

// CREATING OUR MODEL

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
