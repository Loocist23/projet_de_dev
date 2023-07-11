const { SlashCommandBuilder, User } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quiz')
		.setDescription('Replies with Pong!')
		.addStringOption(option => 
			option
			.setName('title')
			.setDescription('Le titre du quiz')
			.setRequired(true)),
	category: 'fun',
	async execute(interaction) {
		const exampleEmbed = new EmbedBuilder()
		.setColor(0x0099FF)
		.setTitle(interaction.options.getString('title'))
		.setAuthor({ name: , iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
		.setDescription('Some description here')
		.setThumbnail('https://i.imgur.com/AfFp7pu.png')
		.addFields(
			{ name: 'Regular field title', value: 'Some value here' },
			{ name: '\u200B', value: '\u200B' },
			{ name: 'Inline field title', value: 'Some value here', inline: true },
			{ name: 'Inline field title', value: 'Some value here', inline: true },
		)
		.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
		.setImage('https://i.imgur.com/AfFp7pu.png')
		.setTimestamp()
		.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
		await interaction.reply({ embeds: [exampleEmbed]});
	},
};