const Startup = require('../models/Startup');

// Fetch startups by status
exports.getStartupsByStatus = async (req, res, status) => {
  try {
    const startups = await Startup.find({ status });
    res.json(startups);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Fetch startup by ID
exports.getStartupById = async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.id);
    if (!startup) {
      return res.status(404).json({ msg: 'Startup not found' });
    }
    res.json(startup);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update startup status
exports.updateStartupStatus = async (req, res, status) => {
  try {
    const startup = await Startup.findById(req.params.id);
    if (!startup) {
      return res.status(404).json({ msg: 'Startup not found' });
    }
    startup.status = status;
    await startup.save();

    res.json({
      msg: status === 'rejected' ? req.body.message || 'Document mismatch' : `Startup ${status}`,
      status,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
