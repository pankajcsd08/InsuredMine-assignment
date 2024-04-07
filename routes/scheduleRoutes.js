const { Router } = require('express');
const scheduleInsertion = require("../controllers/scheduleController");

const router = Router();

router.post("/scheduleInsertionData",(req, res, next)=> next(), scheduleInsertion); //(req, res, next)=> next()
module.exports = router;
