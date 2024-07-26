const Reservation = require('../models/reservation');
const Annonce = require('../models/annonce');

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
    
    async getReservationByProfilId(id) {
        try {
            const reservations = await Reservation.findAll({
                where: {
                  id_compte: id
                },
                include: [{ model: Annonce, attributes: ['titre', 'prix_location'] }]
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