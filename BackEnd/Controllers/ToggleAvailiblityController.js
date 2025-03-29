const toggleAvailability = async (req, res) => {
    try {
        const user = req.user; // Retrieved from middleware
        const { available } = req.body;

        user.available = available;
        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Availability updated successfully',
            available: user.available,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error updating availability',
            error: error.message,
        });
    }
};

module.exports =  toggleAvailability ;
