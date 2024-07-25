const express = require('express');
const router = express.Router();

const annonceService = require('../services/annonce');

router.get('/', async (req, res) => {
    try {
        const annonce = await annonceService.getAllAnnonces();
        res.status(201).json(annonce);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;