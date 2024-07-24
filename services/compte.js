const Compte = require('../models/comptes');

class CompteService {
    async createCompte(data) {
        try {
            const compte = await Compte.create(data);
            return compte;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getCompteById(id) {
        try {
            const compte = await Compte.findByPk(id);
            if (!compte) {
                throw new Error('Compte not found');
            }
            return compte;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateCompte(id, data) {
        try {
            const compte = await Compte.findByPk(id);
            if (!compte) {
                throw new Error('Compte not found');
            }
            await compte.update(data);
            return compte;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteCompte(id) {
        try {
            const compte = await Compte.findByPk(id);
            if (!compte) {
                throw new Error('Compte not found');
            }
            await compte.destroy();
            return compte;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getAllComptes() {
        try {
            const comptes = await Compte.findAll();
            return comptes;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = new CompteService();
