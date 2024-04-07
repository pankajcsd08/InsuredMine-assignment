const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
    agentName: String,
    // Add other agent attributes as needed
});

module.exports = mongoose.model('Agent', agentSchema);