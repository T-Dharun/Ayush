const express = require("express");
const auth = require("../middleware/authMiddleware");
const router = express.Router();
const {
  putMentorData,
  getAllMentorData,
  getMentorById,
  setWebinars,
  getWebinars,
} = require("../controllers/mentorController");
router.post("/putMentorData", auth, putMentorData);
router.get("/getAllMentorData", auth, getAllMentorData);
router.post("/putMentorData", auth, putMentorData);
router.post("/setWebinar", auth, setWebinars);
router.get("/getWebinar", auth, getWebinars);
router.get("/:id", auth, getMentorById);
module.exports = router;
