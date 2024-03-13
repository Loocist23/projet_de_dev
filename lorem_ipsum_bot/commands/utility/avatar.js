//commande permettant de connaitre l'avatar d'un utilisateur

const { SlashCommandBuilder} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Renvoie l\'avatar d\'un utilisateur')
		.addUserOption(option =>
			option.setName('utilisateur')
				.setDescription('L\'utilisateur dont vous voulez l\'avatar')),
	category: 'utility',
	async execute(interaction) {
		const { options } = interaction;
		const user = options.getUser('utilisateur') || interaction.user;

		await interaction.reply(user.displayAvatarURL({ dynamic: true, size: 512 }));
	}
};