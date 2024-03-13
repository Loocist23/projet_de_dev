//commande qui permet de connaitre le ping du bot
const { SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Renvoie le ping du bot'),
    category: 'utility',
    async execute(interaction) {
        await interaction.reply(`Le ping du bot : ${interaction.client.ws.ping}ms`)
    }
};
