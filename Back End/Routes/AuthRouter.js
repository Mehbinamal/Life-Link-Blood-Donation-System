const { signup, login, forgotPassword } = require('../Controllers/AuthController');
const { signupValidation, loginValidation, forgotPasswordValidation} = require('../Middlewares/AuthValidation');

const router = require('express').Router();

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);
router.post('/forgotPassword', forgotPasswordValidation, forgotPassword);
router.patch('/resetPassword/:token', forgotPasswordValidation, forgotPassword);
module.exports = router;