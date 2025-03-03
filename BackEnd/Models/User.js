const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
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
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
});

UserSchema.methods.createResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    console.log(resetToken, this.passwordResetExpires); 

    return resetToken;
}

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;