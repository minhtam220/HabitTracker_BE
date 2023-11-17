const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HabitSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["good", "bad"],
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  completions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Completion",
    },
  ],
  results: [
    {
      type: Schema.Types.ObjectId,
      ref: "Result",
    },
  ],
});

module.exports = mongoose.model("Habit", HabitSchema);
