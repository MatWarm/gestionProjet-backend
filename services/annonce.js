const Annonce = require('../models/annonce');

class AnnonceService{
    async createAnnonce(data){
        try{
            const annonce = await annonce.create(data);
            return annonce;
        }catch(error){
            throw new Error(error.message);
        }
    }
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
        }catch(error){
            throw new Error(error.message);
        }
    }

    async getAnnonceById(id){
        try{
            const annonce = await annonce.findByPk(id);
            if(!annonce){
                throw new Error('Annonce not found');
            }
            return annonce;
        }catch(error){
            throw new Error(error.message);
        }
    }

    async updateAnnonce(id, data){
        try{
            const annonce = await annonce.findByPk(id);
            if(!annonce){
                throw new Error('Annonce not found');
            }
            await annonce.update(data);
            return annonce;
        }catch(error){
            throw new Error(error.message);
        }
    }

    async deleteAnnonce(id){
        try{
            const annonce = await annonce.findByPk(id);
            if(!annonce){
                throw new Error('Annonce not found');
            }
            await annonce.destroy();
            return annonce;
        }catch(error){
            throw new Error(error.message);
        }
    }

}

module.exports = new AnnonceService();