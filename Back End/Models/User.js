const { required, string } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    mobileNo:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum: ['Male','Female'],
        required:true
    },
    bloodGroup:{
        type:String,
        enum: ['A+','A-','B+','B-','AB+','AB-','O+','O-'],
        required:true
    },
    lastDonationDate:{
        type:Date,
    },
    address:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true
    }

});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;