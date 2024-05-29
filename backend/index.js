const { seedMedications, getMedication } = require("./controllers");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});
app.get("/seed", seedMedications);
app.post("/search", getMedication);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
