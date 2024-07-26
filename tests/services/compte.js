const CompteService = require('../../services/compte');
const Compte = require('../../models/compte');
const { expect } = require('chai');
const sinon = require('sinon');


describe('createCompte', () => {
    it('should create a new compte successfully', async () => {
        const data = { mail: 'new@mail.com', password: 'password', nom: 'New', prenom: 'User' };
        const compte = { id: 1, ...data };
        sinon.stub(Compte, 'create').resolves(compte);

        const result = await CompteService.createCompte(data);

        expect(result).to.deep.equal(compte);
        Compte.create.restore();
    });

    it('should throw an error if creation fails', async () => {
        const data = { mail: 'new@mail.com', password: 'password', nom: 'New', prenom: 'User' };
        sinon.stub(Compte, 'create').throws(new Error('Creation failed'));

        try {
            await CompteService.createCompte(data);
        } catch (error) {
            expect(error.message).to.equal('Creation failed');
        }

        Compte.create.restore();
    });
});


describe('verifLogin', () => {
    it('should return compte id if login is successful', async () => {
        const mail = 'test@mail.com';
        const password = 'password';
        const compte = { id: 1, mail, password, etat: true };
        sinon.stub(Compte, 'findOne').resolves(compte);

        const result = await CompteService.verifLogin(mail, password);

        expect(result).to.equal(compte.id);
        Compte.findOne.restore();
    });

    it('should throw an error if compte is not found', async () => {
        const mail = 'test@mail.com';
        const password = 'password';
        sinon.stub(Compte, 'findOne').resolves(null);

        try {
            await CompteService.verifLogin(mail, password);
        } catch (error) {
            expect(error.message).to.equal('Compte not found');
        }

        Compte.findOne.restore();
    });
});

describe('updateCompte', () => {
    it('should update compte successfully', async () => {
        const id = 1;
        const data = { mail: 'updated@mail.com' };
        const compte = { id, mail: 'test@mail.com', update: sinon.stub().resolves() };
        sinon.stub(Compte, 'findByPk').resolves(compte);

        const result = await CompteService.updateCompte(id, data);

        expect(result).to.deep.equal(compte);
        expect(compte.update.calledOnceWith(data)).to.be.true;
        Compte.findByPk.restore();
    });

    it('should throw an error if compte is not found', async () => {
        const id = 1;
        const data = { mail: 'updated@mail.com' };
        sinon.stub(Compte, 'findByPk').resolves(null);

        try {
            await CompteService.updateCompte(id, data);
        } catch (error) {
            expect(error.message).to.equal('Compte not found');
        }

        Compte.findByPk.restore();
    });
});

describe('getCompteById', () => {
    it('should return compte if found', async () => {
        const id = 1;
        const compte = { id, mail: 'test@mail.com', nom: 'Test', prenom: 'User', etat: true };
        sinon.stub(Compte, 'findByPk').resolves(compte);

        const result = await CompteService.getCompteById(id);

        expect(result).to.deep.equal(compte);
        Compte.findByPk.restore();
    });

    it('should throw an error if compte is not found', async () => {
        const id = 1;
        sinon.stub(Compte, 'findByPk').resolves(null);

        try {
            await CompteService.getCompteById(id);
        } catch (error) {
            expect(error.message).to.equal('Compte not found');
        }

        Compte.findByPk.restore();
    });
});

describe('getActiveCompteById', () => {
    it('should return active compte if found', async () => {
        const id = 1;
        const compte = { id, mail: 'test@mail.com', nom: 'Test', prenom: 'User', etat: true };
        sinon.stub(Compte, 'findByPk').resolves(compte);

        const result = await CompteService.getActiveCompteById(id);

        expect(result).to.deep.equal(compte);
        Compte.findByPk.restore();
    });

    it('should throw an error if active compte is not found', async () => {
        const id = 1;
        sinon.stub(Compte, 'findByPk').resolves(null);

        try {
            await CompteService.getActiveCompteById(id);
        } catch (error) {
            expect(error.message).to.equal('Compte not found');
        }

        Compte.findByPk.restore();
    });
});

describe('getCompteByMail', () => {
    it('should return compte if found by mail', async () => {
        const mail = 'test@mail.com';
        const compte = { id: 1, mail, nom: 'Test', prenom: 'User' };
        sinon.stub(Compte, 'findOne').resolves(compte);

        const result = await CompteService.getCompteByMail(mail);

        expect(result).to.deep.equal(compte);
        Compte.findOne.restore();
    });

    it('should throw an error if compte is not found by mail', async () => {
        const mail = 'test@mail.com';
        sinon.stub(Compte, 'findOne').resolves(null);

        try {
            await CompteService.getCompteByMail(mail);
        } catch (error) {
            expect(error.message).to.equal('Compte not found');
        }

        Compte.findOne.restore();
    });
});

describe('deleteCompte', () => {
    it('should delete compte successfully', async () => {
        const id = 1;
        const compte = { id, mail: 'test@mail.com', nom: 'Test', prenom: 'User', etat: true };
        const updatedCompte = { ...compte, nom: 'deleted user', prenom: 'deleted user', mail: 'deleted user', password: 'deleted user', etat: false };
        sinon.stub(CompteService, 'getActiveCompteById').resolves(compte);
        sinon.stub(CompteService, 'updateCompte').resolves(updatedCompte);

        const result = await CompteService.deleteCompte(id);

        expect(result).to.deep.equal(updatedCompte);
        CompteService.getActiveCompteById.restore();
        CompteService.updateCompte.restore();
    });

    it('should throw an error if active compte is not found', async () => {
        const id = 1;
        sinon.stub(CompteService, 'getActiveCompteById').resolves(null);

        try {
            await CompteService.deleteCompte(id);
        } catch (error) {
            expect(error.message).to.equal('Compte not found');
        }

        CompteService.getActiveCompteById.restore();
    });
});