const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HabitSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  goal_type: {
    type: String,
    enum: ["Daily", "Weekly", "Monthly"],
    required: true,
  },
  goal_value: {
    type: Number,
    required: true,
  },
  reminder_time: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

module.exports = mongoose.model("habits", HabitSchema);
