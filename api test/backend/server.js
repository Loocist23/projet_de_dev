const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Middleware pour le logging
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Middleware pour le parsing du corps de la requête en JSON
app.use(express.json());

// Route principale
app.get('/', (req, res) => {
    res.sendfile(path.join('./frontend/index.html'));
});

// Route pour récupérer tous les utilisateurs
app.get('/users', (req, res) => {
    // Code pour récupérer les utilisateurs depuis la base de données
    const users = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' }
    ];
    res.json(users);
});

// Route pour créer un nouvel utilisateur
app.post('/users', (req, res) => {
    // Code pour créer un nouvel utilisateur dans la base de données
    const newUser = req.body;
    res.status(201).json(newUser);
});

// Route pour mettre à jour un utilisateur existant
app.put('/users/:id', (req, res) => {
    // Code pour mettre à jour l'utilisateur avec l'ID spécifié dans la base de données
    const userId = req.params.id;
    const updatedUser = req.body;
    res.json({ id: userId, ...updatedUser });
});

// Route pour supprimer un utilisateur
app.delete('/users/:id', (req, res) => {
    // Code pour supprimer l'utilisateur avec l'ID spécifié de la base de données
    const userId = req.params.id;
    res.json({ message: `Utilisateur avec l'ID ${userId} supprimé` });
});

app.use('/api/annonce', require('./routes/api/annonce.routes'));

app.listen(port, () => {
    console.log(`L'API est en cours d'exécution sur le port ${port}`);
});
