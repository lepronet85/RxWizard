const mongoose = require("mongoose");
const MedicationSchema = new mongoose.Schema({
  name: String,
  description: String,
  usage: String,
  imageUrl: String,
  side_effects: [String],
  interactions: [String],
});

const NoticeSchema = new mongoose.Schema({
  body: String,
  medication_id: String,
});

const Medicaion = mongoose.model("Medicaion", MedicationSchema);
const Notice = mongoose.model("Notice", NoticeSchema);

module.exports = {
  Medicaion,
  Notice,
};
