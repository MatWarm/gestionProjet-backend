const { expect } = require('chai');
const sinon = require('sinon');
const AnnonceService = require('../../services/annonce');
const Annonce = require('../../models/annonce');

describe('AnnonceService', () => {
    let annonceStub;

    beforeEach(() => {
        annonceStub = sinon.stub(Annonce, 'create');
    });

    afterEach(() => {
        sinon.restore();
    });

    it('creates an annonce successfully', async () => {
        const data = { title: 'Test Annonce' };
        annonceStub.resolves(data);

        const result = await AnnonceService.createAnnonce(data);

        expect(result).to.equal(data);
        expect(annonceStub.calledOnceWith(data)).to.be.true;
    });

    it('throws an error when creating an annonce fails', async () => {
        const data = { title: 'Test Annonce' };
        annonceStub.rejects(new Error('Creation failed'));

        try {
            await AnnonceService.createAnnonce(data);
        } catch (error) {
            expect(error.message).to.equal('Creation failed');
        }
    });

    it('retrieves all annonces successfully', async () => {
        const annonces = [{ title: 'Annonce 1' }, { title: 'Annonce 2' }];
        sinon.stub(Annonce, 'findAll').resolves(annonces);

        const result = await AnnonceService.getAllAnnonces();

        expect(result).to.equal(annonces);
    });

    it('throws an error when retrieving all annonces fails', async () => {
        sinon.stub(Annonce, 'findAll').rejects(new Error('Retrieval failed'));

        try {
            await AnnonceService.getAllAnnonces();
        } catch (error) {
            expect(error.message).to.equal('Retrieval failed');
        }
    });

    it('retrieves an annonce by id successfully', async () => {
        const annonce = { id: 1, title: 'Test Annonce' };
        sinon.stub(Annonce, 'findByPk').resolves(annonce);

        const result = await AnnonceService.getAnnonceById(1);

        expect(result).to.equal(annonce);
    });

    it('throws an error when annonce by id is not found', async () => {
        sinon.stub(Annonce, 'findByPk').resolves(null);

        try {
            await AnnonceService.getAnnonceById(1);
        } catch (error) {
            expect(error.message).to.equal('Annonce not found');
        }
    });

    it('updates an annonce successfully', async () => {
        const annonce = { id: 1, title: 'Test Annonce', update: sinon.stub().resolves() };
        sinon.stub(Annonce, 'findByPk').resolves(annonce);

        const data = { title: 'Updated Annonce' };
        const result = await AnnonceService.updateAnnonce(1, data);

        expect(result).to.equal(annonce);
        expect(annonce.update.calledOnceWith(data)).to.be.true;
    });

    it('throws an error when updating an annonce that does not exist', async () => {
        sinon.stub(Annonce, 'findByPk').resolves(null);

        try {
            await AnnonceService.updateAnnonce(1, { title: 'Updated Annonce' });
        } catch (error) {
            expect(error.message).to.equal('Annonce not found');
        }
    });

    it('deletes an annonce successfully', async () => {
        const annonce = { id: 1, title: 'Test Annonce', destroy: sinon.stub().resolves() };
        sinon.stub(Annonce, 'findByPk').resolves(annonce);

        const result = await AnnonceService.deleteAnnonce(1);

        expect(result).to.equal(annonce);
        expect(annonce.destroy.calledOnce).to.be.true;
    });

    it('throws an error when deleting an annonce that does not exist', async () => {
        sinon.stub(Annonce, 'findByPk').resolves(null);

        try {
            await AnnonceService.deleteAnnonce(1);
        } catch (error) {
            expect(error.message).to.equal('Annonce not found');
        }
    });
});