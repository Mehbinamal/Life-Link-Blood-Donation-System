const { signup, login, forgotPassword, resetPassword } = require('../Controllers/AuthController');
const { signupValidation, loginValidation, forgotPasswordValidation,resetPasswordValidation,resetTokenValidation} = require('../Middlewares/AuthValidation');

const router = require('express').Router();

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);
router.post('/forgotPassword', forgotPasswordValidation, forgotPassword);
router.post('/resetPassword/:token', resetPasswordValidation,resetTokenValidation, resetPassword);
module.exports = router;