// Importing required modules
const {
  seedMedications,
  getMedication,
  deleteMedications,
  getMedicationById,
  chat,
} = require("./controllers");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Creating an Express application
const app = express();

// Loading environment variables
require("dotenv").config();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Routes
// Default route
app.get("/", (req, res) => {
  res.send("Hello world");
});

// Route to seed medications data
app.get("/seed", seedMedications);

// Route to delete medications data
app.get("/delete", deleteMedications);

// Route to search medications
app.post("/search", getMedication);

// Route to get medication by id
app.get("/search/:id", getMedicationById);

// Route for chat
app.post("/chat", chat);

// Starting the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
