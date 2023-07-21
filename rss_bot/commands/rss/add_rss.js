// ceci est la commande add_rss elle permet d'ajouter un flux rss à la base de donnée

const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const Parser = require('rss-parser');
const parser = new Parser();
const { Rss } = require('../../database/models');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add_rss')
        .setDescription('Ajoute un flux rss à la base de donnée')
        .addStringOption(option => option.setName('url').setDescription('L\'url du flux rss').setRequired(true)),
    category: 'rss',
    async execute(interaction) {
        const url = interaction.options.getString('url');
        const feed = await parser.parseURL(url);

        const rss = await Rss.create({
            url: url,
            title: feed.title,
            link: feed.link,
            description: feed.description
        });

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Flux rss ajouté')
            .setDescription(`Le flux rss ${rss.title} a été ajouté à la base de donnée`)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};