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
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, "A TOUR MUST HAVE A PRICE !!!"],
  },
});

// CREATING OUR MODEL

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
