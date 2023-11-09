const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CycleSchema = new Schema({
  start_date: {
    type: Date, // Changed to Date type
    required: true,
  },
  end_date: {
    type: Date, // Changed to Date type
    required: true,
  },
  stage: {
    type: String,
    enum: ["analyse", "build", "check"],
    required: true,
  },
  analyse_result: {
    type: String,
  },
  build_duration: {
    type: Number,
  },
  check_result: {
    type: String,
  },
  habits: [
    {
      type: Schema.Types.ObjectId,
      ref: "Habit",
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Cycle", CycleSchema);
