const express = require("express");
const auth = require("../middleware/authMiddleware");
const router = express.Router();
const {
  putMentorData,
  getAllMentorData,
  getMentorById,
} = require("../controllers/mentorController");
router.post("/putMentorData", auth, putMentorData);
router.get("/getAllMentorData", auth, getAllMentorData);
router.get("/:id", auth, getMentorById);
module.exports = router;
