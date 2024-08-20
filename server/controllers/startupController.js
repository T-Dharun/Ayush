const Startup = require("../models/Startup");

exports.createStartup = async (req, res) => {
  const {
    name,
    typeOfEntity,
    dateOfIncorporation,
    registrationNumber,
    registeredAddress,
    contactPerson,
    manufacturingUnitAddress,
    productCategory,
    productionCapacity,
    documents,
    bankDetails,
  } = req.body;

  try {
    const startup = new Startup({
      name,
      typeOfEntity,
      dateOfIncorporation,
      registrationNumber,
      registeredAddress,
      contactPerson,
      manufacturingUnitAddress,
      productCategory,
      productionCapacity,
      documents,
      bankDetails,
      userId: req.user.id,
    });
    await startup.save();
    res.status(201).json(startup);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getStartups = async (req, res) => {
  try {
    const startups = await Startup.find({ userId: req.user.id });
    res.json(startups);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getStartupById = async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.id);
    if (!startup) {
      return res.status(404).json({ msg: "Startup not found" });
    }
    res.json(startup);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
