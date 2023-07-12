const { SlashCommandBuilder} = require('discord.js');
const Discord = require('discord.js');
const { createCanvas, registerFont } = require('canvas');





module.exports = {
    data: new SlashCommandBuilder()
        .setName('generate')
        .setDescription('Génère une image avec le texte donné')
        .addStringOption(option =>
            option
                .setName('text')
                .setDescription('Le text a utiliser pour generer l\'image')
                .setRequired(true)),
    category: 'fun',
    async execute(interaction) {
        const { options } = interaction;
        const text = options.getString('text');

        
        const canvas = createCanvas(500, 500);
        const context = canvas.getContext('2d');

        context.fillStyle = '#000000';
        context.font = 'bold 40px Impact';
        context.textAlign = 'center';
        context.fillText(text, 250, 250);


        const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), 'image.png');

        await interaction.reply({ files: [attachment] });
    }
};
