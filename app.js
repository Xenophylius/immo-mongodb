const express = require("express");
const mustacheExpress = require("mustache-express");
const app = express();
let bodyParser = require("body-parser");
const connectDatabase = require("./config/database");
const router = require("./routes/annonces")
/**
 * Configuration de mustache
 * comme moteur de template
 * pour l'extension .mustache
 */
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

const db = connectDatabase();

/**
 * Configuration de express
 * pour récupérer les données d'un formulaire
 * et pour servir les fichiers statiques
 * (css, js, images, etc.)
 */
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes à ajouter ici
app.use("/", require("./routes/annonces"));


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports = app;
