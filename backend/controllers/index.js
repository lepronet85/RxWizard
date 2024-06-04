const { Medicaion, Notice } = require("../models");
const medications = require("../seed");
const { GoogleGenerativeAI } = require("@google/generative-ai");

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

exports.getMedicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const medication = await Medicaion.findById(id);
    console.log("Medication found", medication);
    res.send(medication);
  } catch (error) {
    console.error(error);
  }
};

// Controller for chat

const notice = {
  indications:
    "Indications: Traitement symptomatique des douleurs légères à modérées et/ou des états fébriles.",
  contre_indications:
    "Contre Indications: Hypersensibilité au paracétamol ou à l'un des excipients.",
  effets_secondaires:
    "Effets secondaire: Réactions allergiques (éruption cutanée, urticaire, choc anaphylactique), Hépatotoxicité en cas de surdosage",
  posologie:
    "Posologie: Adultes : 500 mg à 1 g toutes les 4 à 6 heures. Ne pas dépasser 4 g par jour.",
};

exports.chat = async (req, res) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const { message, medicationId } = req.body;
  const medication = await Medicaion.findById(medicationId);

  async function run() {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_NONE",
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_NONE",
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_NONE",
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_NONE",
        },
      ],
    });

    let chatHistory = [
      {
        role: "user",
        parts: [
          {
            text: `Je veux que tu me donne des informations sur la notice de ${medication.name}. S'il te plait c'est important de  n'est pas repondre a d'autres questions qui ne concerne pas la notice de ${medication.name}. Merci.`,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Je veux bien vous aider, en m'appuyant sur la notice de ce médicament.",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: `${notice.indications}`,
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: `${notice.contre_indications}`,
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: `${notice.effets_secondaires}`,
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: `${medication.posologie}`,
          },
        ],
      },
    ];

    const chat = model.startChat({
      history: chatHistory,
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();
    res.send({ message: text });
    console.log(text);
  }

  run().catch(console.error);
};
