const mongoose = require('mongoose');

const connectToMongo = () => {
    // MongoDB connection
mongoose.connect('mongodb://localhost:27017/insurance');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));
};

module.exports = connectToMongo