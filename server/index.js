require("module-alias/register");
require("dotenv").config();

const express = require("express");
const app = express();
const db = require("./core/database");

app.listen(process.env.PORT, () => {
  try {
    // Testing the connection
    db.authenticate();
    console.log("Server is running");
  } catch (error) {
    console.log(error);
  }
});
