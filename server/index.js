require("dotenv").config();

const express = require("express");
const app = express();
const db = require("./core/database");
const { errorHandler } = require("./middleware/errorHandler");

app.use(express.json());

const registration = require("./modules/registration/routes");
app.use("/registration", registration);
app.use(errorHandler);

try {
  db.sync().then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server is running!");
    });
  });
} catch (error) {
  console.log(error);
}
