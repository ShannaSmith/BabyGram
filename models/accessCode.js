const mongoose = require("mongoose");

//A AccessCode has one owner, a Access Code belongs to a owner
const accessCodeSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
module.exports = mongoose.model("AccessCode", accessCodeSchema, 'access_codes');
