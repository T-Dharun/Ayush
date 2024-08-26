const express = require("express");
const auth = require("../middleware/authMiddleware");
const router = express.Router();
const { putInvestorData } = require("../controllers/investorController");
router.post("/putInvestorData", auth, putInvestorData);
module.exports = router;
