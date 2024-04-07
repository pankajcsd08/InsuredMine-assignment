const { Router } = require('express');
const addItem = require("../controllers/uploadController");
const multer = require('multer');

// Multer configuration for file upload
const upload = multer({ dest: 'uploads/' });

const router = Router();

router.post("/add",upload.single('file'), addItem);
module.exports = router;
