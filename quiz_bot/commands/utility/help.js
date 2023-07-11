const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Provides information about the bot and its commands.'),
    category: 'utility',
    async execute(interaction) {
        await interaction.reply(
            'Here is a list of all my commands:\n' +
            '`/help` - Provides information about the bot and its commands.\n' +
            '`/ping` - Replies with Pong!\n' +
            '`/server` - Provides information about the server.\n' +
            '`/user` - Provides information about the user.\n' +
            '`/quiz` - It\'s QUIZ TIME!\n' +
            '`/reload` - Reloads a command.\n');
    }
};