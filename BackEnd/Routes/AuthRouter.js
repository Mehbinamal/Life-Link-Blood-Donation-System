const { signup, login, forgotPassword, resetPassword, getUserByEmail} = require('../Controllers/AuthController');
const { signupValidation, loginValidation, forgotPasswordValidation,resetPasswordValidation,resetTokenValidation} = require('../Middlewares/AuthValidation');
const fetchUserByEmail = require('../Middlewares/fetchUserByEmail');

const router = require('express').Router();

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);
router.post('/forgotPassword', forgotPasswordValidation, forgotPassword);
router.post('/resetPassword/:token', resetPasswordValidation,resetTokenValidation, resetPassword);
router.get('/:email', fetchUserByEmail, getUserByEmail);
module.exports = router;