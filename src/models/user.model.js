const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, requied: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    department: { type: String },
    salary: { type: String, required: true },
    joining_date: { type: String, required: true },
    profile_img: { type: String },
    payment_history: [],
    roles: [{ type: String, default: "user" }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = new mongoose.model("user", userSchema);
