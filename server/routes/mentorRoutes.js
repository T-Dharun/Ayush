const express = require("express");
const auth = require("../middleware/authMiddleware");
const router = express.Router();
const { putMentorData, setWebinars ,getWebinars} = require("../controllers/mentorController");

router.post("/putMentorData", auth, putMentorData);
router.post("/setWebinar",auth,setWebinars);
router.get("/getWebinar",auth,getWebinars);
module.exports = router;
