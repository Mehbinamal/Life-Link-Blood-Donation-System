const UserModel = require('../Models/User');

// Middleware to fetch user by email
const fetchUserByEmail = async (req, res, next) => {
    const { email } = req.params;

    try {
        // Check if user exists
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found with this email',
            });
        }

        req.user = user;
        next(); 
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error fetching user',
            error: error.message,
        });
    }
};

module.exports = fetchUserByEmail;
