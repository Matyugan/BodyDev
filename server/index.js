require("dotenv").config();

const express = require("express");
const app = express();
const db = require("./core/database");

try {
  db.sync().then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server is running!");
    });
  });
} catch (error) {
  console.log(error);
}
