require("dotenv").config();

const express = require("express");
const app = express();
const db = require("./core/database");
const { errorHandler } = require("./middleware/errorHandler");
// Routes
const registration = require("./modules/registration/routes");
const verification = require("./modules/verification/routes");

app.use(express.json());

app.use("/api/registration", registration);
app.use("/api/verification", verification);
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
