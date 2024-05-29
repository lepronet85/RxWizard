const { Medicaion } = require("../models");
const medications = require("../seed");

// Controller to seed medications

exports.seedMedications = async (req, res) => {
  try {
    // Add medication in medications collection
    await Medicaion.insertMany(medications);
    console.log("Medications have been seeded");
    console.log(medications);
    res.send(medications);
    return medications;
  } catch (error) {
    console.error(error);
  }
};

// Controller to delete medications

exports.deleteMedications = async (req, res) => {
  try {
    // Delete all medications
    await Medicaion.deleteMany({});
    console.log("Medications have been deleted");
    res.send("Medications have been deleted");
  } catch (error) {
    console.error(error);
  }
};

// Controller to get medications from match query

exports.getMedication = async (req, res) => {
  try {
    const { query } = req.body;
    const medication = await Medicaion.find({
      name: { $regex: query, $options: "i" },
    });
    console.log("Medication found", medication);
    res.send(medication);
  } catch (error) {
    console.error(error);
  }
};

// Controller to get medications by id

exports.getMedicationWithId = async (req, res) => {
  try {
    const { id } = req.params;
    const medication = await Medicaion.findById(id);
    console.log("Medication found", medication);
    res.send(medication);
  } catch (error) {
    console.error(error);
  }
};
