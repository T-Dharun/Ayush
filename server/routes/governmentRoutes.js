const express = require('express');
const auth = require('../middleware/authMiddleware');
const checkRole = require('../middleware/roleMiddleware');
const {
  getStartupsByStatus,
  getStartupById,
  updateStartupStatus,
} = require('../controllers/governmentController');
const { register } = require('../controllers/authController');

const router = express.Router();

// Routes for Clerk Role
router.get('/', auth, (req, res) => getStartupsByStatus(req, res, 'approved'));

router.post('/authority/create', auth, checkRole('authority'), (req,res) => register(req,res,'clerk'));

router.get('/clerk', auth, checkRole('clerk'), (req, res) => getStartupsByStatus(req, res, 'pending'));
router.get('/clerk/:id', auth, checkRole('clerk'), getStartupById);
router.patch('/clerk/verify/:id', auth, checkRole('clerk'), (req, res) => updateStartupStatus(req, res, 'proceed'));
router.patch('/clerk/reject/:id', auth, checkRole('clerk'), (req, res) => updateStartupStatus(req, res, 'rejected'));

// Routes for Authority Role
router.get('/authority', auth, checkRole('authority'), (req, res) => getStartupsByStatus(req, res, 'proceed'));
router.get('/authority/:id', auth, checkRole('authority'), getStartupById);
router.patch('/authority/verify/:id', auth, checkRole('authority'), (req, res) => updateStartupStatus(req, res, 'approved'));
router.patch('/authority/reject/:id', auth, checkRole('authority'), (req, res) => updateStartupStatus(req, res, 'rejected'));


module.exports = router;
