const axios = require('axios');

// Données de l'utilisateur à créer
const userData = {
  email: 'anthonyzegnal05@gmail.com',
  pseudo: 'Loocist',
  motDePasse: 'Papacool55!'
};

// URL de l'API pour créer un utilisateur
const apiUrl = 'http://192.168.0.19/users';

// Fonction pour créer un utilisateur
async function createUser() {
  try {
    const response = await axios.post(apiUrl, userData);
    console.log('Utilisateur créé avec succès.');
    console.log('Réponse de l\'API :', response.data);
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur :', error.message);
  }
}

// Appel de la fonction pour créer l'utilisateur
createUser();
