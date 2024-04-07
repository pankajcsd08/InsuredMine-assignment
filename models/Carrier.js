const mongoose = require("mongoose");

const carrierSchema = new mongoose.Schema({
    companyName : String,
    // Add other user attributes as needed
});

module.exports = mongoose.model('Carrier', carrierSchema);
