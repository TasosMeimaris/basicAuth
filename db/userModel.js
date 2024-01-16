const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fName: {
    type: String,
    required: [true, "Please provide first name!"],
    unique: false,
  },
  lName: {
    type: String,
    required: [true, "Please provide last name!"],
    unique: false,
  },
  email: {
    type: String,
    required: [true, "Please provide an Email!"],
    unique: [true, "Email Exist"],
  },

  password: {
    type: String,
    required: [true, "Please provide a password!"],
    unique: false,
  },
});

module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);
