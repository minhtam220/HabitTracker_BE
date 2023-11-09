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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Completion",
    },
  ],
});

module.exports = mongoose.model("Habit", HabitSchema);
