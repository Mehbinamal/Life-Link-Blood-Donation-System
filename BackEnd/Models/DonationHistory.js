const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DonationHistorySchema = new Schema({
    requestId: {
        type: Schema.Types.ObjectId,
        ref: 'BloodRequests', // Reference to BloodRequestModel
        required: true,
    },
    donorEmail: {
        type: String,
        required: true,
    },
    donationDate: {
        type: Date,
        default: Date.now, // Auto-set to current date by default
    },
});

// Create DonationHistory model
const DonationHistoryModel = mongoose.model('DonationHistory', DonationHistorySchema);
module.exports = DonationHistoryModel;
