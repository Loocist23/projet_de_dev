const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quiz')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply('It\'s QUIZ TIME!');
	},
};