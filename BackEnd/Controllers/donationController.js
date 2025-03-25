const DonationHistoryModel = require('../Models/DonationHistory');
const BloodRequestModel = require('../Models/BloodRequests');
const UserModel = require('../Models/User')

const acceptRequest = async (req, res) => {
    const { requestId, donorEmail } = req.params; // Extract params from URL

    try {
        // Get the blood request attached by the middleware
        const request = req.bloodRequest;
    
        // Create a new donation history entry
        const newDonationHistory = new DonationHistoryModel({
            requestId: request._id,
            donorEmail: donorEmail,
            donationDate: Date.now(),
        });

        const user = await UserModel.findOne({ email: donorEmail });
        user.lastDonationDate = Date.now();
        await user.save();

        // Save the donation history
        await newDonationHistory.save();

        // Update the status of the blood request to 'Completed'
        request.status = 'Completed';
        await request.save();

        res.status(200).json({
            success: true,
            message: 'Request accepted, donation history created, and status updated.',
            donationHistory: newDonationHistory,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: error.message,
        });
    }
};

module.exports = {
    acceptRequest,
};
