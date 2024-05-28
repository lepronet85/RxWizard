// Expo starts here

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

app.post("/search", (req, res) => {
  const requestData = req.body; // Récupérez les données du corps de la requête
  console.log("Données reçues :", requestData);
  res.send("Données reçues");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
