const BloodRequestModel = require('../Models/BloodRequests');
const UserModel = require('../Models/User');

const validateRequest = async (req, res, next) => {
    const { requestId, donorEmail } = req.params; // Get requestId from params

    try {
        // Check if the blood request exists
        const request = await BloodRequestModel.findById(requestId);

        if (!request) {
            return res.status(404).json({ success: false, message: 'Blood request not found.' });
        }

        const user = await UserModel.findOne({ email: donorEmail });
        if (user.lastDonationDate) {
            const threeMonthsAgo = new Date();
            threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3); // Subtract 3 months

            if (user.lastDonationDate > threeMonthsAgo) {
                return res.status(400).json({
                    success: false,
                    message: `You can only donate once in 3 months. Your last donation was on ${user.lastDonationDate.toDateString()}.`,
                });
            }
        }

        // Check if the request is already completed
        if (request.status === 'Completed') {
            return res.status(400).json({ success: false, message: 'Request has already been completed.' });
        }

        // Attach request to req object to use in the controller
        req.bloodRequest = request;

        next();
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error.', error: error.message });
    }
};

module.exports = validateRequest;
