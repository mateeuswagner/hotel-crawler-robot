const moment = require('moment');

module.exports = {
    validateBuscar: (req) => {
        const checkin = moment(req.body.checkin, "DD/MM/YYYY");
        const checkout = moment(req.body.checkout, "DD/MM/YYYY");

        let validation = {
            isValid: false
        }

        if (!checkin.isValid() || !checkout.isValid()){
            validation.message = 'Missing mandatory parameter';
        }else if(!checkin.isBefore(checkout)){
            validation.message = 'Checkout must be after Checkin';
        } else {
            validation.isValid = true;
        }
        
        return validation;
    }
}


