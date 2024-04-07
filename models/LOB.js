const mongoose = require("mongoose");

const lobSchema = new mongoose.Schema({
    categoryName : String,
    // Add other user attributes as needed
});

module.exports = mongoose.model('LOB', lobSchema);
