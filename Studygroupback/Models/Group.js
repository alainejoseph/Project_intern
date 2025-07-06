var mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  title: String,
  description: String,
  subject: String,
  createdAt: String,
  isApproved: {
    type: Boolean,
    default: false,
  },
  createdBy: String,
  members: Array,
});

const Group = mongoose.model("groups", groupSchema);
module.exports = Group;

