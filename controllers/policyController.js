
const Agent = require('../models/Agent');
const User = require('../models/User');
const Policy = require('../models/Policy');
const Carrier = require('../models/Carrier');
const UserAccount = require('../models/UserAccount');
const LOB = require('../models/LOB');

//question 2 i.e. task 1, 2 question
const policySearch = async (req, res) => {
    if (!req?.body?.username) {
        return res.status(400).send('No username was given.');
    }

    const filter = { firstName : { $regex: req.body.username,  $options: "i"}}

    
    return User.aggregate([
        {
          $match: filter,
        },
        {
          $lookup: {
             from: "policies",
              as: "policies",
              localField: "_id",
              foreignField: "user",
           },
        },
        //to spread data of policies we can uncomment below stage
        // {
        //   $unwind: {
        //      path: "$policies",
        //      preserveNullAndEmptyArrays: true,
        //  },
        // }
      ])
   
}

//question 3 i.e. task 1, 3 question
const policyAggregate = async (req, res) => {
    // I did not understand actually what this line means API to provide aggregated policy by each user.
    // if it's to just to get each user policy info details is code 
    //if its to group and add sum of amount then after this code below commented code

    return User.aggregate([
        {
          $lookup: {
             from: "policies",
              as: "policies",
              let: { uId: "$_id" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                       $eq: ["$user", "$$uId"] 
                    },
                    },
                },
                {
                    $lookup: {
                       from: "carriers",
                        as: "company",
                        localField: "company",
                        foreignField: "_id",
                     },
                },
                {
                    $lookup: {
                       from: "lobs",
                        as: "policyCategory",
                        localField: "policyCategory",
                        foreignField: "_id",
                     },
                },
              ],
           },
        },
      ])

     // second things that question suggest

    //   return Policy.aggregate([
    //     {
    //         $group: {
    //           _id: "$user",
    //           policyNumber: {$first: "$policyNumber"},
    //           premiumAmountWritten: {$sum: "$premiumAmountWritten"},
    //           premiumAmount: {$sum: "$premiumAmount"},
    //           policyType: {$first: "$policyType"},
    //           policyStartDate: {$first: "$policyStartDate"},
    //           policyEndDate: {$first: "$policyEndDate"},
    //           policyMode: {$first: "$policyMode"},
    //         },
    //     },
    //     {
    //       $lookup: {
    //          from: "users",
    //          as: "users",
    //          localField: "_id",
    //          foreignField: "_id",
    //       },
    //     }
    //   ])
}

module.exports = {
    policySearch,
    policyAggregate,
  }