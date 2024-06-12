// Importing Mongoose library
const mongoose = require("mongoose");

// Define Medication schema
const MedicationSchema = new mongoose.Schema({
  name: String,
  description: String,
  usage: String,
  imageUrl: String,
  side_effects: [String],
  interactions: [String],
});

// Define Notice schema
const NoticeSchema = new mongoose.Schema({
  body: String,
  medication_id: String,
});

// Create models from schemas
const Medicaion = mongoose.model("Medicaion", MedicationSchema);
const Notice = mongoose.model("Notice", NoticeSchema);

// Export Medication and Notice models

module.exports = {
  Medicaion,
  Notice,
};
