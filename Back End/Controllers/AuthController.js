const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../Models/User')
const sendEmail = require('../Utils/email')


const signup = async (req, res) => {
    try {
        const { name, email, password, mobileNo, gender, bloodGroup, lastDonationDate, address, city, pincode  } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: 'User already exist, please login', success: false });
        }
        const userModel = new UserModel({ name, email, password,mobileNo, gender, bloodGroup, lastDonationDate, address, city, pincode });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({
                message: "Signup successfully",
                success: true
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}
const login = async (req, res) => {
    try {
        const {email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMessage = 'Authentication Failiure , Wrong Email or password';
        if (!user) {
            return res.status(403)
                .json({ message: errorMessage, success: false });
        }
        
        const isPasswordEqual = await bcrypt.compare(password,user.password);
        if (!isPasswordEqual) {
            return res.status(403)
                .json({ message: errorMessage, success: false });
        }

        const jwtToken = jwt.sign(
            {email: user.email,_id : user._id},
            process.env.JWT_SECRET,
            { expiresIn :'24h'}
        )

        res.status(200)
            .json({
                message: "Login Success",
                success: true,
                jwtToken,
                email,
                name: user.name
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}

const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(403).json({
                message: "No user registered with this email",
                success: false,
            });
        }

        const resetToken = user.createResetPasswordToken();
        await user.save({ validateBeforeSave: false });

        const resetUrl = `${req.protocol}://${req.get("host")}/auth/resetPassword/${resetToken}`;
        const message = `Your Password Reset Link is: ${resetUrl} \n If you did not request this email, please ignore it.`;

        await sendEmail({
            email: user.email, 
            subject: "Password Reset Link",
            message: message,
        });

        res.status(201).json({
            message: "Email Sent",
            success: true,
        });
    } catch (err) {
        if (err.message.includes("sending mail")) {
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save({ validateBeforeSave: false });
        }

        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

module.exports = {
    signup,
    login,
    forgotPassword
}