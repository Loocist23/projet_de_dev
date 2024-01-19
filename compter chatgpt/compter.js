const fs = require('fs');
const path = require('path');

// Fonction pour compter les prompts de l'utilisateur
function compterPrompts(jsonData) {
    let promptsCount = 0;
    jsonData.forEach(item => {
        Object.values(item.mapping || {}).forEach(value => {
            if (value.message && value.message.author && value.message.author.role === 'user') {
                promptsCount++;
            }
        });
    });
    return promptsCount;
}

// Fonction pour obtenir la date de modification du fichier
function dateModificationFichier(filePath) {
    const stats = fs.statSync(filePath);
    return stats.mtime.toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

// Chemin vers le fichier JSON
const filePath = 'conversations.json';

// Lecture et traitement du fichier JSON
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Erreur lors de la lecture du fichier:', err);
        return;
    }
    const jsonData = JSON.parse(data);

    const conversations = jsonData.length;
    const prompts = compterPrompts(jsonData);
    console.log(`Date du fichier: ${dateModificationFichier(filePath)}`);
    console.log(`Nombre total de conversations: ${conversations}`);
    console.log(`Nombre total de prompts: ${prompts}`);
    console.log(`Nombre moyen de prompts par conversation: ${prompts / conversations}`);
    
    // Traitement supplémentaire pour les statistiques restantes
    const lengths = jsonData.map(item => Object.keys(item.mapping || {}).length);
    const maxPrompts = Math.max(...lengths);
    const minPrompts = Math.min(...lengths);
    const sortedJsonData = [...jsonData].sort((a, b) => Object.keys(a.mapping || {}).length - Object.keys(b.mapping || {}).length);

    console.log(`Nombre max de prompts dans une conversation: ${maxPrompts}`);
    console.log(`Conversation avec le plus de prompts: ${jsonData.find(item => Object.keys(item.mapping || {}).length === maxPrompts).title}`);
    console.log(`Conversation avec le moins de prompts: ${jsonData.find(item => Object.keys(item.mapping || {}).length === minPrompts).title}`);
    console.log(`Deuxieme conversation avec le moins de prompts: ${sortedJsonData[1].title}`);
    console.log(`Deuxieme conversation avec le plus de prompts: ${sortedJsonData[sortedJsonData.length - 2].title}`);
    // Autres calculs selon les besoins...
});
