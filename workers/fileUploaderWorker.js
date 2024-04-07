const { parentPort, workerData } = require('worker_threads');
const fs = require('fs');
const csvParser = require('csv-parser');
const Agent = require('../models/Agent');
const User = require('../models/User');
const Policy = require('../models/Policy');
const Carrier = require('../models/Carrier');
const UserAccount = require('../models/UserAccount');
const LOB = require('../models/LOB');
const mongoose = require('mongoose');

// // MongoDB connection
mongoose.connect('mongodb://localhost:27017/insurance');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Process CSV file and insert data into MongoDB
fs.createReadStream(workerData)
    .pipe(csvParser())
    .on('data', async (data) => {
        // const session = await mongoose.startSession();
        try {
            // session.startTransaction();
            // Example: Creating Agent, User, and Policy documents
            const agentDoc = await Agent.findOneAndUpdate(
                { agentName: data.agent },
                {},
                { new: true, upsert: true }
              )

            const userDoc = await User.findOneAndUpdate(
                { phoneNumber : data.phone },
                {
                   firstName: data.firstname,
                   gender: data.gender,
                   dob: new Date(data.dob),
                   city: data.city,
                   address: data.address, 
                   state: data.state, 
                   zipCode: data.zip, 
                   email: data.email,
                   userType: data.userType,
                },
                { new: true, upsert: true }
            )

            const userAccountDoc = await UserAccount.findOneAndUpdate(
                { accountName : data.account_name },
                {
                    accountType: data.account_type,
                    ...(userDoc._id ? {user: userDoc._id}:{}),
                },
                { new: true, upsert: true }
            )

            const lobDoc = await LOB.findOneAndUpdate(
                { categoryName : data.category_name },
                {
                    
                },
                { new: true, upsert: true }
            )

            const carrierDoc = await Carrier.findOneAndUpdate(
                { companyName : data.company_name },
                {
                    
                },
                { new: true, upsert: true }
            )

            await new Policy({
                policyNumber: data.policy_number,
                premiumAmountWritten: parseFloat(data.premium_amount_written || 0),
                premiumAmount: parseFloat(data.premium_amount || 0),
                policyType: data.policy_type,
                policyStartDate: new Date(data.policy_start_date),
                policyEndDate: new Date(data.policy_end_date),
                csr: data.csr, 
                producer: data.producer,
                policyMode: data.policy_mode,
                ...(lobDoc._id ? {policyCategory: lobDoc._id}:{}),
                ...(carrierDoc._id? {company: carrierDoc._id}:{}),
                ...(userDoc._id ? {user: userDoc._id}:{}),
                ...(agentDoc._id? {agent: agentDoc._id}:{}),             
              }).save()
         
        // await mongoSession.commitTransaction()
        // mongoSession.endSession()
        } catch (err) {
            console.error(err);
            // await mongoSession.abortTransaction()
            // mongoSession.endSession()
        }
    })
    .on('end', () => {
        parentPort.postMessage('Data inserted into MongoDB');
    });
