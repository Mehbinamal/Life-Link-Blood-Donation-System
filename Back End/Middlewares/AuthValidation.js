const Joi = require('joi');

const signupValidation = (req, res, next) => {
    
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required(),
        mobileNo: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
        gender: Joi.string().valid('Male', 'Female').required(),
        bloodGroup: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-').required(),
        lastDonationDate: Joi.date().optional(),
        address: Joi.string().min(5).max(200).required(),
        city: Joi.string().min(2).max(100).required(),
        pincode: Joi.string().length(6).pattern(/^[0-9]+$/).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400)
            .json({ message: "Bad request", error })
    }
    next();
}
const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400)
            .json({ message: "Bad request", error })
    }
    next();
}
module.exports = {
    signupValidation,
    loginValidation
}