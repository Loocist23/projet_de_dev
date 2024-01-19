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

client.once('ready', () => {
    console.log('Bot est connecté !');
    setInterval(sendImages, 5000); // Chaque minute par exemple. Changez le nombre pour ajuster l'intervalle.
    
});

async function sendImages() {
    const channel = await client.channels.fetch("871823710913454172");
    
    fs.readdir("C:/Users/moi/Desktop/projet_de_dev/test_bot_size", (err, files) => {
        if (err) throw err;

        for (const file of files) {
            if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.pdf') || file.endsWith('.txt')) {
                const file_path = path.join("C:/Users/moi/Desktop/projet_de_dev/test_bot_size", file);
                const destination_path = path.join("C:/Users/moi/Desktop/projet_de_dev/test_bot_size/oui", file);

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

client.login("MTA5MjUwMTQ3NjU1MjczNjg2OQ.GTz8P8.DR4GM0cA14Yo-ueZmssaArnC4cvRGzxE7iK5YY");