const { Router } = require('express');
const { policySearch, policyAggregate } = require("../controllers/policyController");


const router = Router();

router.get("/policySearch",(req, res, next)=> next(), policySearch);
router.get("/policyAggregate",(req, res, next)=> next(), policyAggregate);
module.exports = router;
