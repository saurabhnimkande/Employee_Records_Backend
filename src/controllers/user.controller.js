const express = require("express");
const router = express.Router();

const User = require("../models/user.model");

const authenticate = require("../middlewares/authenticate");
const authorise = require("../middlewares/authorise");

router.get("/", authenticate, authorise(["admin"]), async (req, res) => {
  try {
    const department = req.query.department;
    console.log("department:", department);
    const page = +req.query.page || 1;
    const size = +req.query.size || 30;
    const skip = (page - 1) * size;
    if (department == "") {
      const count = await User.find().count().lean().exec();
      const users = await User.find().skip(skip).limit(size).lean().exec();
      return res.status(200).json({ users, status: "true", total: count });
    } else {
      const count = await User.find({ department: department })
        .count()
        .lean()
        .exec();
      const users = await User.find({ department: department })
        .skip(skip)
        .limit(size)
        .lean()
        .exec();
      return res.status(200).json({ users, status: "true", total: count });
    }
  } catch (e) {
    return res.status(400).json({ error: e.message, status: "false" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const users = await User.findOne({ _id: req.params.id }).lean().exec();

    return res.status(200).json({ users, status: "true" });
  } catch (e) {
    return res.status(400).json({ error: e.message, status: "false" });
  }
});

router.get("/search/:query", async (req, res) => {
  try {
    const page = +req.query.page || 1;
    const size = +req.query.size || 30;
    const skip = (page - 1) * size;
    const count = await User.find({
      name: { $regex: req.params.query },
    })
      .count()
      .lean()
      .exec();

    const users = await User.find({
      name: { $regex: req.params.query },
    })
      .skip(skip)
      .limit(size)
      .lean()
      .exec();

    return res.status(200).json({ users, status: "true", total: count });
  } catch (e) {
    return res.status(400).json({ error: e.message, status: "false" });
  }
});

module.exports = router;
