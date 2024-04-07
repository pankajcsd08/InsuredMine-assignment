const express = require('express');
const os = require('os');
const { exec } = require('child_process');
const app = express();
const bodyParser = require('body-parser');
const upload = require('./routes/uploadRoutes')
const policy = require('./routes/policyRoutes')
const schedule = require('./routes/scheduleRoutes')



app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function trackCPUUtilization() {
    const cpuUsage = os.loadavg()[0]; // Get CPU usage in the last minute
    console.log('Current CPU Usage:', cpuUsage);

    if (cpuUsage >= 0.7) { // If CPU usage is 70% or more
        console.log('CPU usage is high. Restarting server...');
        // Restart the server
        // replace npm run start with original server restart command
        exec('npm run start', (error, stdout, stderr) => { 
            if (error) {
                console.log(`Error restarting server: ${error}`);
                return;
            }
            console.log(`Server restarted: ${stdout}`);
        });
    }
}
//question 5 i.e. task 2, 1 question
//Task 2.1
//Track real-time CPU utilization of the node server and on 70% usage restart the server.
trackCPUUtilization()

//Task 1.1
//Create API to upload the attached XLSX/CSV data into MongoDB. EndPoint: http://localhost:3000/api/upload/add 
app.use("/api/upload", upload);
// Task 1.2 and task 1.3
//Search API to find policy info with the help of the username. EndPoint: http://localhost:3000/api/policy/policySearch?username=Omar
//API to provide aggregated policy by each user. EndPoint: http://localhost:3000/api/policy/policyAggregate
app.use("/api/policy", policy);
//Task 2.2 
//Create a post-service that takes the message, day, and time in body parameters and it inserts that message into DB at that particular day and time.
//EndPoint: http://localhost:3000/api/schedule/scheduleInsertionData
app.use("/api/schedule", schedule); 



module.exports = app;