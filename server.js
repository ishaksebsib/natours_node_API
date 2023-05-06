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

// START THE SERVER
const app = require("./app");
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port} ...`);
});
