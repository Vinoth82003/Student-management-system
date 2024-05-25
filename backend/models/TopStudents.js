const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  rollno: String,
  std: String,
  sec: String,
  rank: String,
  imagePath: String,
});

module.exports = mongoose.model("TopStudents", userSchema);
