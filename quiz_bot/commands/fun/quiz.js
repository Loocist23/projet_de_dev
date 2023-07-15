const { SlashCommandBuilder, User, Embed } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('quiz')
    .setDescription('Replies with Pong!')
    .addStringOption(option =>
      option
        .setName('title')
        .setDescription('Le titre du quiz')
        .setRequired(true))
    .addStringOption(option =>
      option
        .setName('quiz')
        .setDescription('Le quiz')
        .setRequired(true))
    .addStringOption(option =>
      option
        .setName('answer')
        .setDescription('La réponse')
        .setRequired(true))
    .addStringOption(option =>
      option
        .setName('answer2')
        .setDescription('La réponse 2')
        .setRequired(true))
    .addStringOption(option =>
      option
        .setName('answer3')
        .setDescription('La réponse 3')
        .setRequired(true))
    .addIntegerOption(option =>
      option
        .setName('right_answer')
        .setDescription('Le numéro de la bonne réponse (1, 2 ou 3)')
        .setRequired(true))
    .addIntegerOption(option =>
      option
        .setName('points')
        .setDescription('Le nombre de points gagnés')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(10)),

  category: 'fun',
  async execute(interaction) {
    const { options } = interaction;
    const title = options.getString('title');
    const question = options.getString('quiz');
    const answer = options.getString('answer');
    const answer2 = options.getString('answer2');
    const answer3 = options.getString('answer3');
    const rightAnswer = options.getInteger('right_answer');
    const points = options.getInteger('points');

    if (![1, 2, 3].includes(rightAnswer)) {
      await interaction.reply('La valeur de la bonne réponse est invalide. Veuillez choisir parmi 1, 2 ou 3.', { ephemeral: true });
      return;
    }

    const correctAnswerEmojis = ['1️⃣', '2️⃣', '3️⃣'];
    const correctAnswerEmoji = correctAnswerEmojis[rightAnswer - 1];
    const correctAnswer = [answer, answer2, answer3][rightAnswer - 1];

    const exampleEmbed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle(title)
      .setAuthor({ name: 'QUIZBOT', iconURL: 'https://i.imgur.com/jNjEGwR.png' })
      .setDescription('Bienvenue au quiz Discord ! Répondez aux questions en utilisant les émojis correspondants pour donner vos réponses !')
      .addFields(
        { name: '❔ Question', value: question },
        { name: '1️⃣ Reponse 1', value: answer },
        { name: '2️⃣ Reponse 2', value: answer2 },
        { name: '3️⃣ Reponse 3', value: answer3 }
      )
      .setTimestamp()
      .setFooter({ text: 'Bot créé par Loocist', iconURL: 'https://i.imgur.com/jNjEGwR.png' });

    const message = await interaction.reply({ embeds: [exampleEmbed], fetchReply: true });
    await message.react('1️⃣');
    await message.react('2️⃣');
    await message.react('3️⃣');

    const filter = (reaction, user) => {
      return correctAnswerEmojis.includes(reaction.emoji.name) && !user.bot;
    };

    const reactedUsers = new Set();
    const collector = message.createReactionCollector({ filter, time: 10000 });

    collector.on('collect', (reaction, user) => {
      if (reactedUsers.has(user.id)) {
        reaction.users.remove(user.id);
      } else {
        reactedUsers.add(user.id);
      }
    });

    collector.on('end', collected => {
      const reactionsCount = collected.reduce((acc, reaction) => {
        const count = reaction.count - 1;
        return acc + count;
      }, 0);

      const uniqueUsersCount = reactedUsers.size;

      const selectedAnswerCount = collected.get(correctAnswerEmoji)?.count - 1 || 0;

      const resultEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Résultats du quiz')
        .setDescription('Voici les résultats du quiz :')
        .addFields(
          { name: 'Bonne réponse (emoji) :', value: correctAnswerEmoji },
          { name: 'Bonne réponse (complète) :', value: correctAnswerEmoji + correctAnswer },
          { name: 'Nombre de réactions :', value: reactionsCount.toString() },
          { name: 'Nombre de personnes différentes ayant réagi :', value: uniqueUsersCount.toString() },
          { name: 'Nombre de personnes ayant choisi la bonne réponse :', value: selectedAnswerCount.toString() },
          { name: 'Points gagnés pour la bonne réponse :', value: (selectedAnswerCount * points).toString() }
        )
        .setTimestamp();

      interaction.channel.send({ embeds: [resultEmbed] });
    });
  },
};
