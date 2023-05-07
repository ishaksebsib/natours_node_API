const mongoose = require("mongoose");
// SETUP ENV
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

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

const testTour = new Tour({
  name: "The Forest Hiker",
  rating: 5,
  price: 200,
});

testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log("ERROR :", err);
  });

// START THE SERVER
const app = require("./app");
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port} ...`);
});
