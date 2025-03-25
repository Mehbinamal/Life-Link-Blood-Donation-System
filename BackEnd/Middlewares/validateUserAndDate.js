const UserModel = require('../Models/User');

// Middleware to validate user and check valid date
const validateUserAndDate = async (req, res, next) => {
    const { email } = req.params;
    const { newDonationDate } = req.body;

    try {
        // Check if the user exists
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.',
            });
        }

        // Check if newDonationDate is valid
        if (!newDonationDate || isNaN(Date.parse(newDonationDate))) {
            return res.status(400).json({
                success: false,
                message: 'Invalid date format. Please provide a valid date.',
            });
        }

        // Attach user and validated date to req for use in controller
        req.user = user;
        req.validDate = new Date(newDonationDate);

        next(); // Proceed to controller if validation succeeds
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: error.message,
        });
    }
};

module.exports = validateUserAndDate;
