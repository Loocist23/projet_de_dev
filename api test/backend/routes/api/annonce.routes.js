const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({ nom: 'Annonce', prenom: 'Annonce' });
});

module.exports = router;