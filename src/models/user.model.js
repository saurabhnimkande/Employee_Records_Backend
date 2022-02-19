const bcrypt = require("bcryptjs");
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
    password: { type: String, required: true },
    roles: { type: [String], default: ["user"] },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  bcrypt.hash(this.password, 10, (err, hash) => {
    this.password = hash;
    return next();
  });
});

userSchema.methods.checkPassword = function (password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, function (err, same) {
      if (err) return reject(err);

      return resolve(same);
    });
  });
};

module.exports = new mongoose.model("user", userSchema);
