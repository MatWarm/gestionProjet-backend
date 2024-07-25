const annonce = require('../models/annonce');

class AnnonceService{

    async getAllAnnonces() {
        try {
            const annonces = await annonce.findAll();
            return annonces;
        } catch (error) {
            throw new Error(error.message);
        }
    }

}

module.exports = new AnnonceService();