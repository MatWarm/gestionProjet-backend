const CompteService = require('../services/compte');
const jwtToken = require('../utils/generateToken');


const login = async (req) => {
    const {mail, password} = req.body;
    var id = await CompteService.verifLogin(mail, password)
    if (id) {
        const userPayload = await CompteService.getCompteById(id);

        return jwtToken.generateToken(userPayload.dataValues);
    } else {
        throw new Error('Invalid credentials');
    }
};



module.exports = {login};