const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const Parser = require('rss-parser');
const parser = new Parser();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('check_rss')
        .setDescription('Renvoie les derniers articles d\'un flux rss')
        .addStringOption(option => option.setName('url').setDescription('L\'url du flux rss').setRequired(true)),
    category: 'rss',
    async execute(interaction) {
        const url = interaction.options.getString('url');
        const feed = await parser.parseURL(url);

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(feed.title)
            .setURL(feed.link)
            .setDescription(feed.description)
            .setTimestamp();

        const items = feed.items.slice(0, 25); // Limite à 25 éléments

        items.forEach(item => {
            embed.addFields({ name: item.title, value: item.link + "\n" + item.pubDate });
        });

        await interaction.reply({ embeds: [embed] });
    }
};