const express = require('express');
const router = express.Router();

const reservationService = require('../services/reservation');

router.get('/voiture/:idAnnonce', async (req, res) => {
    try {
        // console.log(req.params.idAnnonce);
        const reservation = await reservationService.getReservationByAnnonceId(req.params.idAnnonce);
        res.status(201).json(reservation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/profil/:idProfil', async (req, res) => {
    try {
        // console.log(req.params.idAnnonce);
        const reservation = await reservationService.getReservationByProfilId(req.params.idProfil);
        res.status(201).json(reservation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const reservation = await reservationService.createReservation(req.body);
        res.status(201).json(reservation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;