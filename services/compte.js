const Compte = require('../models/compte');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10; 

class CompteService {
    async createCompte(data) {
        try {
            const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS)
            const compte = await Compte.create({ ...data, password: hashedPassword });
            console.log(compte);
            return compte;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async verifLogin(mail, password) {
        try {
            const compte = await Compte.findOne({ where: { mail } });
            if (!compte) {
                throw new Error('Compte non trouvé');
            }
            
            const isPasswordValid = await bcrypt.compare(password, compte.password);
            if (!isPasswordValid) {
                throw new Error('Mot de passe incorrect');
            }
            return compte;

        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateCompte(id, data) {
        try {
            var compte = await Compte.findByPk(id);
            if (!compte) {
                throw new Error('Compte not found');
            }
            await compte.update(data);
            return compte;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getCompteById(data) {
        try {
            const compte = await Compte.findByPk(data.id, {
                attributes: ['id', 'mail', 'nom', 'prenom', 'etat']
            });

            if (!compte) {
                throw new Error('Compte not found');
            }
            return compte;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getActiveCompteById(id) {
        try {
            const compte = await Compte.findByPk(id, {
                attributes: ['id', 'mail', 'nom', 'prenom', 'etat'],
                where: { etat: true }
            });

            if (!compte) {
                throw new Error('Compte not found');
            }
            return compte;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getCompteByMail(mail) {
        try {
            const compte = await Compte.findOne({
                attributes: ['id', 'mail', 'nom', 'prenom',],
                where: { mail: mail }
            });

            if (!compte) {
                throw new Error('Compte not found');
            }
            return compte;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteCompte(id) {
        try {
            const compte = await this.getActiveCompteById(id);
            if (!compte) {
                throw new Error('Compte not found');
            }

            const data = {
                nom: 'deleted user',
                prenom: 'deleted user',
                mail: 'deleted user',
                password: 'deleted user',
                etat: false
            }

            return await this.updateCompte(id, data);
        } catch (error) {
            throw new Error(error.message);
        }
    }

}

module.exports = new CompteService();
