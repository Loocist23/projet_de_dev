# Quiz Bot

Quiz Bot est un bot Discord développé en JavaScript.

## Description

Quiz Bot est un bot Discord simple qui a été développé pour une utilisation facile et sans soucis.

## Installation

1. Cloner ce dépôt en utilisant la commande suivante :

   ```bash
   git clone https://github.com/Loocist23/projet_de_dev.git

2. Naviguer dans le dossier du bot :

   ```bash
    cd quiz_bot

3. Installer les dépendances :

   ```bash
   npm install

## Utilisation

1. Crée un fichier config.json 

```
{
    "token": "token", // Token du bot a trouver sur le site de discord developper
    "clientId": "clientId", // Id du bot a trouver sur le site de discord developper
    "guildId": "guildId", Id du serveur a trouver sur le discord ou vous vouller tester le bot
}
```

2. Deployer le bot sur votre serveur discord test

   ```bash
   node deploy-commands.js

3. Lancer le bot

   ```bash
    node index.js

## commandes

1. /quiz : Permet de lancer un quiz
2. /generate : Permet de générer une image
3. /help : Permet d'afficher les commandes du bot
4. /delete : Permet de supprimer les messages du channel
5. /ping : Permet de voir le ping du bot
6. /avatar : Permet de voir l'avatar d'un utilisateur
7. /reload : Permet de recharger les commandes du bot
8. /server : Permet de voir les informations du serveur
9. /user : Permet de voir les informations d'un utilisateur


## Contribution

Les contributions sont les bienvenues. Pour toute modification majeure, veuillez ouvrir d'abord une issue pour discuter de ce que vous aimeriez changer.

## License

[MIT](https://choosealicense.com/licenses/mit/)

