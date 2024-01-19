const mysql = require('mysql2');

// Remplacez les valeurs ci-dessous par les informations de connexion appropriées
const dbConfig = {
  host: '192.168.0.18', // Remplacez par l'hôte de votre base de données
  user: 'rss', // Remplacez par le nom d'utilisateur de la base de données
  password: 'RSS', // Remplacez par le mot de passe de la base de données
  database: 'RSS', // Remplacez par le nom de la base de données
};

// Créez une connexion à la base de données
const connection = mysql.createConnection(dbConfig);

// Essayez de vous connecter à la base de données
connection.connect((err) => {
  if (err) {
    console.error('Erreur lors de la connexion à la base de données :', err);
    return;
  }
  console.log('Connexion à la base de données réussie !');

  // Fermez la connexion à la base de données
  connection.end((err) => {
    if (err) {
      console.error('Erreur lors de la fermeture de la connexion à la base de données :', err);
      return;
    }
    console.log('Connexion à la base de données fermée.');
  });
});
