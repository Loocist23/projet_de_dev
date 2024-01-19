const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('compter')
        .setDescription('Compter les éléments dans un fichier JSON')
        .addAttachmentOption(option =>
            option.setName('fichier')
                .setDescription('Le fichier JSON à traiter')
                .setRequired(true)),
    category: 'utility',
    async execute(interaction) {
        const fichier = interaction.options.getAttachment('fichier');

        if (!fichier.contentType.includes('json')) {
            await interaction.reply({ content: 'Veuillez fournir un fichier .json', ephemeral: true });
            return;
        }

        try {
            const response = await axios.get(fichier.url);
            const jsonData = response.data;

            const conversations = jsonData.length;
            const prompts = compterPrompts(jsonData);
            const dateFichier = dateModificationFichier(fichier.url);

            const lengths = jsonData.map(item => Object.keys(item.mapping || {}).length);
            const maxPrompts = Math.max(...lengths);
            const minPrompts = Math.min(...lengths);
            const sortedJsonData = [...jsonData].sort((a, b) => Object.keys(a.mapping || {}).length - Object.keys(b.mapping || {}).length);

            let replyMessage = `Date du fichier: ${dateFichier}\n`;
            replyMessage += `Nombre total de conversations: ${conversations}\n`;
            replyMessage += `Nombre total de prompts: ${prompts}\n`;
            replyMessage += `Nombre moyen de prompts par conversation: ${prompts / conversations}\n`;
            replyMessage += `Nombre max de prompts dans une conversation: ${maxPrompts}\n`;
            replyMessage += `Conversation avec le plus de prompts: ${jsonData.find(item => Object.keys(item.mapping || {}).length === maxPrompts).title}\n`;
            replyMessage += `Conversation avec le moins de prompts: ${jsonData.find(item => Object.keys(item.mapping || {}).length === minPrompts).title}\n`;
            replyMessage += `Deuxieme conversation avec le moins de prompts: ${sortedJsonData[1].title}\n`;
            replyMessage += `Deuxieme conversation avec le plus de prompts: ${sortedJsonData[sortedJsonData.length - 2].title}`;

            await interaction.reply({ content: replyMessage, ephemeral: true });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Il y a eu une erreur lors du traitement du fichier.', ephemeral: true });
        }
    }
};

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

function dateModificationFichier(url) {
    // Vous devez modifier cette fonction pour gérer les URL
    // Pour l'instant, elle renvoie simplement une chaîne de caractères factice
    return 'Date non disponible pour les URL';
}