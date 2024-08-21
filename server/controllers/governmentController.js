const Startup = require('../models/Startup');

// Fetch startups by status
exports.getStartupsByStatus = async (req, res, st) => {
  let status = st === 'approved' ? st : getStatusBasedOnRole(req.user.role);

  if (!status) {
    return res.status(401).json({ message: "Unauthorized" });
  }

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
  status = status === 'verify' ? getStatusBasedOnVerify(req.user.role) : status;

  if (!status) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const startup = await Startup.findById(req.params.id);
    if (!startup) {
      return res.status(404).json({ msg: 'Startup not found' });
    }

    startup.status = status;
    await startup.save();
    console.log(status +" "+req.user.role) ;

    res.json({
      msg: status === 'rejected' ? (req.body.message || 'Document mismatch') : `Startup ${status}`,
      status,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Helper function to get status based on role
function getStatusBasedOnRole(role) {
  switch (role) {
    case 'clerk':
      return 'pending';
    case 'authority':
      return 'proceed';
    default:
      return null;
  }
}
function getStatusBasedOnVerify(role) {
  switch (role) {
    case 'clerk':
      return 'proceed';
    case 'authority':
      return 'approved';
    default:
      return null;
  }
}

