const express = require("express");
const {
  createStartupStepOne,
  createStartupStepTwo,
  createStartupStepThree,
  getStartups,
  getStartupById,
} = require("../controllers/startupController");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/step1", auth, createStartupStepOne);
router.post("/step2", auth, createStartupStepTwo);
router.post("/step3", auth, createStartupStepThree);

router.get("/", auth, getStartups);
router.get("/:id", auth, getStartupById);

module.exports = router;
