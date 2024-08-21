const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { secret, expiresIn } = require("../config/jwt");
const bcrypt = require("bcryptjs");
exports.register = async (req, res) => {
  let { name, email, password, role } = req.body;
  //console.log(req.body);
  if(req.user && req.user.role == "authority") role="clerk";
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    user = await new User({ name, email, password, role });
    await user.save();
    console.log(user);
    const payload = { user: { id: user.id , role:user.role} };
    jwt.sign(payload, secret, { expiresIn }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).json({ msg: "Invalid email credentials" });
    }

    // Compare the entered password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid password credentials" });
    }

    // If password matches, create a JWT token
    const payload = { user: { id: user.id ,role:user.role } };
    jwt.sign(payload, secret, { expiresIn }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
