const BloodRequestModel = require("../Models/BloodRequests");

const getAllBloodRequests = async (req, res) => {
    try {
        const bloodRequests = await BloodRequestModel.find().select(
            "-_id -byStanderEmail -createdAt -status"
        );

        res.status(200).json({
            success: true,
            data: bloodRequests
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};


module.exports = { getAllBloodRequests };
