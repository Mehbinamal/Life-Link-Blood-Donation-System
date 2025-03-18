const mongoose = require("mongoose");

const validateRequestRetrieval = (req, res, next) => {

    const { id } = req.params;
    
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid request ID format",
        });
    }

    next();
};

module.exports = { validateRequestRetrieval };
