
const connectToMongo = require('./config/db');
const app = require('./app');
const port = 3010

connectToMongo();

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});