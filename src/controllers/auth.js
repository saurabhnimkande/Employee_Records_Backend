require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const createToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_ACCESS_KEY);
};

const register = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).lean().exec();

    if (user) {
      return res.status(400).json({ Error: "try with different email id" });
    }

    const createUser = await User.create(req.body);

    const token = createToken(createUser);

    return res
      .status(201)
      .json({ status: "success", token: token, user: createUser });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        Error: "Please provide correct email address and password",
        status: "false",
      });
    }

    const match = await user.checkPassword(req.body.password);

    if (!match)
      return res.status(400).json({
        message: "Please provide correct email address and password",
        status: "false",
      });

    const token = createToken(user);

    res.status(201).json({ user, token, status: "true" });
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "false" });
  }
};

module.exports = { register, login, createToken };
