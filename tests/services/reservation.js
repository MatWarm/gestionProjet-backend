const Reservation = require('../../models/reservation');
const ReservationService = require('../../services/reservation');
const { expect } = require('chai');
const sinon = require('sinon');


describe('createReservation', () => {
    it('should create a new reservation successfully', async () => {
        const data = { id_annonce: 1, date_debut: '2023-01-01', date_fin: '2023-01-10' };
        const reservation = { id: 1, ...data };
        sinon.stub(Reservation, 'create').resolves(reservation);

        const result = await ReservationService.createReservation(data);

        expect(result).to.deep.equal(reservation);
        Reservation.create.restore();
    });

    it('should throw an error if creation fails', async () => {
        const data = { id_annonce: 1, date_debut: '2023-01-01', date_fin: '2023-01-10' };
        sinon.stub(Reservation, 'create').throws(new Error('Creation failed'));

        try {
            await ReservationService.createReservation(data);
        } catch (error) {
            expect(error.message).to.equal('Creation failed');
        }

        Reservation.create.restore();
    });
});


describe('getReservationByAnnonceId', () => {
    it('should return reservations for a given annonce id', async () => {
        const id = 1;
        const reservations = [
            { id: 1, date_debut: '2023-01-01', date_fin: '2023-01-10' },
            { id: 2, date_debut: '2023-02-01', date_fin: '2023-02-10' }
        ];
        sinon.stub(Reservation, 'findAll').resolves(reservations);

        const result = await ReservationService.getReservationByAnnonceId(id);

        expect(result).to.deep.equal(reservations);
        Reservation.findAll.restore();
    });

    it('should throw an error if fetching reservations fails', async () => {
        const id = 1;
        sinon.stub(Reservation, 'findAll').throws(new Error('Fetch failed'));

        try {
            await ReservationService.getReservationByAnnonceId(id);
        } catch (error) {
            expect(error.message).to.equal('Fetch failed');
        }

        Reservation.findAll.restore();
    });
});

