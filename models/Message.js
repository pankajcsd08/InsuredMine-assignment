const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    message: String,
    createdAt: Date,
    // Add other agent attributes as needed
});

module.exports = mongoose.model('Message', messageSchema);