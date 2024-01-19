const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Bienvenue sur mon API!');
});

app.listen(port, () => {
    console.log(`L'API est en cours d'exécution sur le port ${port}`);
});
