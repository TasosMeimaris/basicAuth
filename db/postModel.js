const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    fName: {
      type: String,
      required: true,
      unique: false,
    },
    lName: {
      type: String,
      required: true,
      unique: false,
    },
    mainText: {
      type: String,
      required: true,
      unique: false,
    },
    datePosted: Date,
  });

  module.exports = mongoose.model.Posts || mongoose.model("Posts", PostSchema);