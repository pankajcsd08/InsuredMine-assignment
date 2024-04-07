const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: String,
    gender: String,
    dob: Date,
    city: String,
    address: String, 
    // CSV data is not on numeric form so taken string
    phoneNumber: { type: String, required: true }, 
    state: String, 
    // CSV data is not on numeric form so taken string
    zipCode: String, 
    email: String,
    userType: String,
    // Add other user attributes as needed
});

module.exports = mongoose.model('User', userSchema);
