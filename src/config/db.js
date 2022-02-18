const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect(
    "mongodb+srv://saurabh:saurabh@cluster0.aw4kn.mongodb.net/employee-database"
  );
};
