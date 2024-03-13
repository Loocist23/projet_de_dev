const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addrss')
        .setDescription('Ajoute un flux RSS au canal')
        .addStringOption(option =>
            option.setName('url')
                .setDescription('L\'URL du flux RSS')
                .setRequired(true)),
    category: 'utility',
    async execute(interaction) {
        const url = interaction.options.getString('url');
        const channelId = interaction.channelId;
        
        // Lire le fichier JSON des flux RSS
        const fichierRSS = path.join(__dirname, 'rssFeeds.json');
        const rssData = JSON.parse(fs.readFileSync(fichierRSS, 'utf-8'));

        // Ajouter le nouveau flux
        rssData.feeds.push({ url, channelId });

        // Sauvegarder les modificationscd 
        fs.writeFileSync(fichierRSS, JSON.stringify(rssData, null, 2), 'utf-8');

        await interaction.reply(`Flux RSS ajouté pour ce canal : ${url}`);
    }
};
