const BloodRequestModel =  require('../Models/BloodRequests');

const bloodRequest = async (req,res) =>{
    try {
        const {patientName,patientAge,hospitalName,bloodGroup,unitsRequired,urgencyLevel,byStanderName,contactNumber,byStanderEmail,location,createdAt,status} = req.body;
        const bloodRequestModel = new BloodRequestModel({
        patientName,patientAge,hospitalName,bloodGroup,unitsRequired,urgencyLevel,byStanderName,contactNumber,byStanderEmail,location,createdAt,status
        });
        await bloodRequestModel.save();
        res.status(701)
            .json({
                message: "Blood Request Created Successfully",
                success: true
            })
    } catch (error) {
        res.status(702)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
    
}

module.exports ={
    bloodRequest
}