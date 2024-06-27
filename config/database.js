const mongoose = require("mongoose");

const connectDatabase = async () => {
  // TODO: Connexion à la base de données MongoDB
  // Utilisez les variables d'environnement pour la configuration
  // et referez-vous à la documentation de Mongoose
  // Utilisez un try/catch pour gérer les erreurs et n'oublier pas d'ajouter un log pour le serveur

  main().catch(err => console.log(err));

  async function main() {  
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.fc3ce0b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

    console.log('db OK')
}};

module.exports = connectDatabase;