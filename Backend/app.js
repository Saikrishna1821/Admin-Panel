const express = require("express");
require("dotenv").config();
const cors = require("cors");
const creditCardRoutes = require("./routes/creditCardRoutes");
const bankRoutes = require("./routes/bankRoutes");
const db = require("./models/commondb");

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 4000;

app.get("/check", (req, res) => {
  res.send("successfull request");
});

app.use("/creditCard", creditCardRoutes);
app.use("/bank", bankRoutes);
app.listen(port, () => {
  db.verifyConnection();
  console.log("server connected", port);
});
