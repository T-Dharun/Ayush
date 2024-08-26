const Mentor = require("../models/Mentor");
const mongoose = require("mongoose");

exports.putMentorData = async (req, res) => {
  const { step, data } = req.body;

  if (!step || !data) {
    return res.status(400).json({ message: "Step and data are required" });
  }

  // Ensure userId is available from the request (auth middleware should add this)
  const userId = req.user.id;
  if (!userId) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  // Validate and convert userId to ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid userId" });
  }
  const userObjectId = mongoose.Types.ObjectId(userId);

  try {
    if (step === "1") {
      const {
        network,
        name,
        interest,
        startupState,
        budget,
        investmentCategorySector,
        panCard,
        brief,
      } = data;

      let mentor = await Mentor.findOne({ userId: userObjectId });
      if (!mentor) {
        mentor = new Mentor({ userId: userObjectId });
      }

      mentor.network = network;
      mentor.name = name;
      mentor.interest = interest;
      mentor.startupState = startupState;
      mentor.budget = budget;
      mentor.investmentCategorySector = investmentCategorySector;
      mentor.panCard = panCard;
      mentor.brief = brief;

      await mentor.save();
      return res
        .status(200)
        .json({ message: "Step 1 data saved successfully", mentor });
    }

    if (step === "2") {
      const { addressLine, state, district, pincode, linkedin, website } = data;

      let mentor = await Mentor.findOne({ userId: userObjectId });
      if (!mentor) {
        return res.status(404).json({ message: "Mentor not found" });
      }

      // Update mentor with step 2 data
      mentor.addressLine = addressLine;
      mentor.state = state;
      mentor.district = district;
      mentor.pincode = pincode;
      mentor.linkedin = linkedin;
      mentor.website = website;

      await mentor.save();
      return res
        .status(200)
        .json({ message: "Step 2 data saved successfully", mentor });
    }

    return res.status(400).json({ message: "Invalid step" });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
