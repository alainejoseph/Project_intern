const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  filename: String,
  originalName: String,
  groupId: String,
});

const File = mongoose.model("File", fileSchema);
module.exports = File;
