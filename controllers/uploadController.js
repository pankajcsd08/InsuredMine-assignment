
const { Worker } = require('worker_threads');
//question 1 i.e. task 1, 1 question
const addItem = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No files were uploaded.');
    }

    const filePath = req.file.path;

    // Create worker thread to process file
    const worker = new Worker('./workers/fileUploaderWorker.js', { workerData: filePath });
    worker.on('message', async (message) => {
        console.log(message);
        res.status(200).send('Data uploaded successfully');
    });
}

module.exports = addItem;

