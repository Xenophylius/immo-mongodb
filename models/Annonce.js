const mongoose = require("mongoose");

const annonceSchema = new mongoose.Schema({
  // TODO: Définissez les champs du schéma ici, par exemple titre, prix, caractéristiques, etc.
  titre: String,
  description: String,
  prix: Number,
  surface: Number,
  localisation: {
    ville: String,
    codePostal: String,
  },
  caractéristiques: {
    chambre: Number,
    salleDeBain: Number,
    balcon: Boolean,
    jardin: Boolean,
    parking: Boolean
  }
});

// l'etape de transformation du schema en modele sert a creer des instances de donnees
// a partir du schema et d'y ajouter des comportements (methodes)
// ici nous n'ajoutons pas de comportements mais on pourrait le faire avec par exemple
// annonceSchema.methods.rateAnnonce = function() { rating code here }

// le premier argument est le nom du modele, le deuxieme est le schema
// le nom du modele est important car il sera utilise pour creer la collection dans la base de donnees
const Annonce = mongoose.model("Annonce", annonceSchema);

module.exports = Annonce;