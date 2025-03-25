const BloodRequestModel = require("../Models/BloodRequests");

const getAllBloodRequests = async (req, res) => {
    try {
        const bloodRequests = await BloodRequestModel.find({ status: "Pending" });

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

const getBloodRequestByID = async (req,res) => {
    try{
        const { id } = req.params;
        const bloodRequest = await BloodRequestModel.findOne({ _id: id });


        if (!bloodRequest) {
            return res.status(404).json({
                success: false,
                message: "Blood request not found"
            });
        }

        res.status(200).json({
            success: true,
            data: bloodRequest
        });

    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};


module.exports = { getAllBloodRequests,getBloodRequestByID };
