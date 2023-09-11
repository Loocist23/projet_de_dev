const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});
const fs = require('fs');
const path = require('path');

// le token est dans le config.json ainsi que le channel id, le source folder et le destination folder
const { TOKEN, CHANNEL_ID, SOURCE_FOLDER, DESTINATION_FOLDER } = require('./config.json');



client.once('ready', () => {
    console.log('Bot est connecté !');
    setInterval(sendImages, 5000); // Chaque minute par exemple. Changez le nombre pour ajuster l'intervalle.
});

async function sendImages() {
    const channel = await client.channels.fetch(CHANNEL_ID);
    
    fs.readdir(SOURCE_FOLDER, (err, files) => {
        if (err) throw err;

        for (const file of files) {
            if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.gif')) {
                const file_path = path.join(SOURCE_FOLDER, file);
                const destination_path = path.join(DESTINATION_FOLDER, file);

                channel.send({
                    files: [file_path]
                }).then(() => {
                    console.log(`Image envoyée : ${file}`);
                    fs.rename(file_path, destination_path, err => {
                        if (err) throw err;
                    });
                }).catch(console.error);
            }
        }
    });
}

client.login(TOKEN);
