const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
    policyNumber: String,
    premiumAmountWritten: Number,
    premiumAmount: Number,
    policyType: String,
    policyStartDate: Date,
    policyEndDate: Date,
    csr: String,
    policyMode: String,
    producer: String,
    policyCategory: mongoose.Schema.Types.ObjectId,
    company: mongoose.Schema.Types.ObjectId,
    user: mongoose.Schema.Types.ObjectId,
    agent: mongoose.Schema.Types.ObjectId,
    // Add other policy attributes as needed
    //policy number, policy start date, policy end date, policy category- collection id, company collection id, and user id.
});

module.exports = mongoose.model('Policy', policySchema);