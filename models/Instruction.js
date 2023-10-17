const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InstructionSchema = new Schema({
  stage: {
    type: String,
    enum: ["analyse", "build", "check"],
    required: true,
  },
  day: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("instructions", InstructionSchema);
