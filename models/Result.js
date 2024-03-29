const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ResultSchema = new Schema({
  result_date: {
    type: Date,
    required: true,
  },
  complete: {
    type: Boolean,
    required: true,
  },
  stage: {
    type: String,
    enum: ["analyse", "build", "check"],
    required: true,
  },
  totalCompletions: {
    type: Number,
    required: true,
  },
  totalDopamines: {
    type: Number,
    required: true,
  },
  currentStreak: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  habit: {
    type: Schema.Types.ObjectId,
    ref: "Habit",
    required: true,
  },
});

module.exports = mongoose.model("Result", ResultSchema);
