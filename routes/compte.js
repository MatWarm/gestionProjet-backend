const express = require('express');
const router = express.Router();


const compteService = require('../services/compte');


router.post('/', async (req, res) => {
    try {
        const compte = await compteService.createCompte(req.body);
        res.status(201).json(compte);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;