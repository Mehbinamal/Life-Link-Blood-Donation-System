const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BloodRequestSchema = new Schema({
    patientName: {
        type: String,
        required: true,
    },
    patientAge: {
        type: Number,
        required: true,
    },
    hospitalName: {
        type: String,
        required: true,
    },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        required: true,
    },
    unitsRequired: {
        type: Number,
        required: true,
    },
    urgencyLevel: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        required: true,
    },
    byStanderName:{
        type:String,
        required:true
    },
    contactNumber: {
        type: String,
        required: true,
    },
    byStanderEmail:{
        type:String,
    },
    location: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected', 'Completed'],
        default: 'Pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const BloodRequestModel = mongoose.model('BloodRequests',BloodRequestSchema);
module.exports = BloodRequestModel;