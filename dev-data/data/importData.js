// SETUP ENV
const dotenv = require("dotenv");

const mongoose = require("mongoose");
const fs = require("fs");
const Tour = require("../../models/tourModel");

dotenv.config({
  path: "../../config.env",
});
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

// READ JSON FILE

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8")
);

// IMPORT DATA INTO DB

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("Data successfully loaded");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// DELETE ALL DATA

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("Data successfully deleted");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "--import" || process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "--delete" || process.argv[2] === "-d") {
  deleteData();
}
