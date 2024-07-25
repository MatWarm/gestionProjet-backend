const Annonce = require('../models/annonce');

class AnnonceService{

    async getAllAnnonces() {
        try {
            const annonces = await Annonce.findAll();
            return annonces;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    async createAnnonce(data) {
        try {
            const annonce = await Annonce.create(data);
            return annonce;
        } catch (error) {
            throw new Error(error.message);
        }
    }

}

module.exports = new AnnonceService();