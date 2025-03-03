const Joi = require('joi');
const UserModel = require('../Models/User')
const crypto = require('crypto')


const signupValidation = (req, res, next) => {
    
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required(),
        mobileNo: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
        gender: Joi.string().valid('Male', 'Female').required(),
        bloodGroup: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-').required(),
        lastDonationDate: Joi.date().allow(null, '').optional(),
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

const forgotPasswordValidation = (req, res, next) =>{
    const schema = Joi.object({
        email: Joi.string().email().required()
    })
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400)
            .json({ message: "Bad request", error })
    }
    next();
}

const resetTokenValidation = async (req,res,next) => {
    try {
        const token = req.params.token;
        
        if (!token) {
            return res.status(400).json({ message: "Reset token is required", success: false });
        }
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
        const user = await UserModel.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() } 
        })
        if (!user) {
            return res.status(600).json({ message: "Invalid or expired token", success: false });
        }
       
        req.user = user;
        
        next();

    } catch (error) {
        res.status(510).json({ message: "Internal server error", success: false });
    }
}
const resetPasswordValidation = (req, res, next) => {
    const schema = Joi.object({
        newPassword: Joi.string().min(4).max(100).required(),
        confirmPassword: Joi.string().valid(Joi.ref("newPassword")).required().messages({
            "any.only": "Passwords do not match",})
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad request", error: error.details[0].message });
    }
    
    next();
};

module.exports = {
    signupValidation,
    loginValidation,
    forgotPasswordValidation,
    resetPasswordValidation,
    resetTokenValidation
}