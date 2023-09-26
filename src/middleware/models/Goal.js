const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GoalSchema = new Schema({
  goal_type: {
    type: String,
    enum: ["Daily", "Weekly", "Monthly"],
    required: true,
  },
  goal_value: {
    type: Number,
    required: true,
  },
  habit_id: {
    type: Schema.Types.ObjectId,
    ref: "habits",
    required: true,
  },
});

module.exports = mongoose.model("goals", GoalSchema);
