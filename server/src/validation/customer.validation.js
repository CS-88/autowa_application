//VALIDATING REGISTRATION
const Joi = require('@hapi/joi');

//Customer Validation
const registerCustomerValidation = data => {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(50)
            .required(),
        email: Joi.string()
            .min(6)
            .max(255)
            .email()
            .required(),
        mobile_no: Joi.string()
            .max(10)
            .min(10)
            .required(),
        vehicle_type: Joi.string(),
        vehicle_model: Joi.string(),
        vehicle_number: Joi.string(),
        mileage: Joi.string(),
        url: Joi.string(),
        password: Joi.string()
            .min(6)
            .max(1024)
    });
    return schema.validate(data);
}



module.exports.registerCustomerValidation = registerCustomerValidation;