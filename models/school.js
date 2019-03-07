const mongoose = require("mongoose");

const student_schema = new mongoose.Schema({
  name: {
    type: String,
    required: "Name is reqiuerd"
  },
  number: {
    type: Number,
    required: "Number is reqiuerd"
  },
  filed: {
    type: String,
    required: "Filed is reqiuerd"
  }
},
{
  timestamps: true
});

module.exports = mongoose.model("users", student_schema);
