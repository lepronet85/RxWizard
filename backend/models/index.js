const mongoose = require("mongoose");
const MedicationSchema = new mongoose.Schema({
  name: String,
  description: String,
  usage: String,
  side_effects: [String],
  interactions: [String],
});

const Medicaion = mongoose.model("Medicaion", MedicationSchema);

module.exports = {
  Medicaion,
};
