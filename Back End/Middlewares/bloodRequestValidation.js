const Joi = require('joi');

const bloodRequestValidation = (req,res,next) => {
    const schema = Joi.object({
        patientName: Joi.string().required().messages({
            'string.empty': 'Patient name is required',
            'any.required': 'Patient name is required',
        }),
        patientAge: Joi.number().integer().min(0).required().messages({
            'number.base': 'Patient age must be a number',
            'number.integer': 'Patient age must be an integer',
            'number.min': 'Patient age must be a positive number',
            'any.required': 'Patient age is required',
        }),
        hospitalName: Joi.string().required().messages({
            'string.empty': 'Hospital name is required',
            'any.required': 'Hospital name is required',
        }),
        bloodGroup: Joi.string()
            .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
            .required()
            .messages({
                'string.empty': 'Blood group is required',
                'any.only': 'Invalid blood group',
                'any.required': 'Blood group is required',
            }),
        unitsRequired: Joi.number().integer().min(1).required().messages({
            'number.base': 'Units required must be a number',
            'number.integer': 'Units required must be an integer',
            'number.min': 'At least 1 unit is required',
            'any.required': 'Units required is required',
        }),
        urgencyLevel: Joi.string()
            .valid('Low', 'Medium', 'High')
            .required()
            .messages({
                'string.empty': 'Urgency level is required',
                'any.only': 'Invalid urgency level',
                'any.required': 'Urgency level is required',
            }),
        byStanderName: Joi.string().required().messages({
            'string.empty': 'Bystander name is required',
            'any.required': 'Bystander name is required',
        }),
        contactNumber: Joi.string()
            .pattern(/^[0-9]{10}$/) // Assuming a 10-digit phone number
            .required()
            .messages({
                'string.pattern.base': 'Contact number must be a 10-digit number',
                'string.empty': 'Contact number is required',
                'any.required': 'Contact number is required',
            }),
        byStanderEmail: Joi.string()
            .email({ tlds: { allow: false } }) // Validate email format
            .optional()
            .messages({
                'string.email': 'Invalid email format',
            }),
        location: Joi.string().required().messages({
            'string.empty': 'Location is required',
            'any.required': 'Location is required',
        }),
        status: Joi.string()
            .valid('Pending', 'Approved', 'Rejected', 'Completed')
            .default('Pending')
            .messages({
                'any.only': 'Invalid status',
            }),
        createdAt: Joi.date().default(Date.now).messages({
            'date.base': 'Invalid date',
        })
    })
    const { error } = schema.validate(req.body);
    if (error) {
        const errorMessage = error.details.map(detail => detail.message).join(', ');
        return res.status(700)
            .json({ message: "Bad request", error: errorMessage });
    }
    next();
};

module.exports = { bloodRequestValidation }