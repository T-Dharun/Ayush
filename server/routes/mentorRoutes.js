const express = require("express");
const auth = require("../middleware/authMiddleware");
const router = express.Router();
const { putMentorData } = require("../controllers/mentorController");
router.post("/putMentorData", auth, putMentorData);
module.exports = router;
