const express = require('express');
const auth=require("../middleware/authMiddleware")
const checkRole = require('../middleware/roleMiddleware');
const { getStartup ,getStartupById ,verifyStartup, rejectStartup} = require('../controllers/governmentController');

const router = express.Router();

router.get('/clerk',auth,checkRole('clerk'),getStartup); // Ensure this matches the exported function
router.get('/clerk/:id',auth,checkRole('clerk'),getStartupById);
router.get('/clerk/verify/:id',auth,checkRole('clerk'),verifyStartup);
router.patch('/clerk/reject/:id',auth,checkRole('clerk'),rejectStartup);


module.exports = router;
