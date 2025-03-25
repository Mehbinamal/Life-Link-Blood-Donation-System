// Update Last Donation Date Controller
const updateLastDonationDate = async (req, res) => {
    try {
        // Retrieve validated user and date from middleware
        const user = req.user;
        const newDonationDate = req.validDate;

        // Update lastDonationDate field
        user.lastDonationDate = newDonationDate;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Last donation date updated successfully.',
            lastDonationDate: user.lastDonationDate,
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
    updateLastDonationDate,
};
