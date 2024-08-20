const express = require("express");
const {
  createStartup,
  getStartups,
  getStartupById,
} = require("../controllers/startupController");
const auth = require("../middleware/authMiddleware");
const router = express.Router();
router.post("/", auth, createStartup);
router.get("/", auth, getStartups);
router.get("/:id", auth, getStartupById);

module.exports = router;
