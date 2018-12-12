const moment = require('moment');

module.exports = {
    validateBuscar: (req) => {
        const checkin = moment(req.body.checkin, "DD/MM/YYYY");
        const checkout = moment(req.body.checkout, "DD/MM/YYYY");

        let validation = {
            isValid: false
        }
        
        // Not valid params
        if (!checkin.isValid() || !checkout.isValid()){
            validation.message = 'Missing or not correct mandatory parameter';

        // Checkin is not today
        } else if (!moment().isBefore(checkin)) {
            validation.message = 'Checkin must be set to a future date!'

        // Checkin is before checkout
        }else if(!checkin.isBefore(checkout)){
            validation.message = 'Checkout must be after Checkin';
        // Is Valid
        } else {
            validation.isValid = true;
        }
        
        return validation;
    }
}


