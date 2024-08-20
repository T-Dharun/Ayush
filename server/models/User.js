const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["startup", "clerk", "authority", "stakeholder"],
    required: false,
  },
  date: { type: Date, default: Date.now },
});
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  console.log(this.password);
  next();
});
UserSchema.methods.comparePassword = function (password) {
  console.log(this.password);
  return bcrypt.compare(password, this.password);
};
module.exports = mongoose.model("User", UserSchema);
