const mongoose = require("mongoose");

//A Post has many likes, a like belongs to an Post
const accessCodeSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
module.exports = mongoose.model("AccessCode", accessCodeSchema, 'access_codes');
