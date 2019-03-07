const mongoose = require("mongoose");

const loginform_schema = new mongoose.Schema({
  email: {
    type: String
  },
  passwored: {
    type: String
  }
});
module.exports = mongoose.model("test", loginform_schema);
