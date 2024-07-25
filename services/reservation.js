const Reservation = require('../models/reservation');

class ReservationService{

    async getReservationByAnnonceId(id) {
        try {
            const reservations = await Reservation.findAll({
                where: {
                  id_annonce: id
                },
                attributes: ['id', 'date_debut', 'date_fin']
              });
              return reservations;          
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async createReservation(data) {
        try {
            const reservation = await Reservation.create(data);
            return reservation;
        } catch (error) {
            throw new Error(error.message);
        }
    }

}

module.exports = new ReservationService();