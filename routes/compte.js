const express = require('express');
const router = express.Router();


const compteService = require('../services/compte');
const compteController = require('../controllers/compte');

router.post('/', async (req, res) => {
    try {
        const compte = await compteService.createCompte(req.body);
        res.status(201).json(compte);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try{
        const token = await compteController.login(req)
        res.status(200).json({"token" : token});
    }catch (error){
        res.status(400).json({ error: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const compte = await compteService.updateCompte(req.params.id, req.body);
        res.status(200).json(compte);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const compte = await compteService.deleteCompte(req.params.id);
        res.status(200).json(compte);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
 });


module.exports = router;