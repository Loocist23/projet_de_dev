const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete')
		.setDescription('delete up to 99 messages.')
		.addIntegerOption(option =>
			option.setName('amount')
				.setDescription('Number of messages to delete')
				.setMinValue(1)
				.setMaxValue(100)),
	category: 'moderation',
	async execute(interaction) {
		const amount = interaction.options.getInteger('amount');

		await interaction.channel.bulkDelete(amount, true).catch(error => {
			console.error(error);
			interaction.reply({ content: 'There was an error trying to delete messages in this channel!', ephemeral: true });
		});

		return interaction.reply({ content: `Successfully delete \`${amount}\` messages.`, ephemeral: true });
	},
};