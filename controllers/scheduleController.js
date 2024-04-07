const schedule = require('node-schedule')
const Message = require('../models/Message');

//question 6 i.e. task 2, 2 question
const scheduleInsertion = async (req, res) => {
    const { message, day, time } = req.body;

    if(!message){
        return res.status(400).send('message is required!');
    }

   if(!day){
    return res.status(400).send('day is required!');
   }

   if(!time){
    return res.status(400).send('time is required!');
   }

   // Combine day and time into a single string
   const dateTimeString = `${day} ${time}`;

   // Parse the combined string into a Date object
   const date = new Date(dateTimeString);

   // Check if the date is valid
   if (isNaN(date.getTime())) {
       throw new Error('Invalid date format');
   }

//    console.log("date ===>",date, new Date())
//In this question I am little bit no clear so written first cron job (sheduling job) approach first
// after this commented code is if question means to just modifiy createdAt date.
  const cronJob = schedule.scheduleJob(date,async()=>{
    await Message.create({
        message: message,
        createdAt: new Date(),
    })
    cronJob.cancel()
  })
  //second things as mentioned above
//   await Message.create({
//     message: message,
//     createdAt: date,
//   })
}

module.exports = scheduleInsertion;

