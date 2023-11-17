const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Result = require("./Result");

const CompletionSchema = new Schema({
  completion_date: {
    type: Date,
    required: true,
  },
  complete: {
    type: Boolean,
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

module.exports = mongoose.model("Completion", CompletionSchema);
