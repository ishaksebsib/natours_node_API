// SETUP ENV
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// START THE SERVER
const app = require("./app");
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port} ...`);
});
