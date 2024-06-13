const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Student", studentSchema);
