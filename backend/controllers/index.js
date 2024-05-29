const { Medicaion } = require("../models");
const medications = require("../seed");

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
