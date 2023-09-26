const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProgressSchema = new Schema({
  progress_value: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  habit_id: {
    type: Schema.Types.ObjectId,
    ref: "habits",
    required: true,
  },
});

module.exports = mongoose.model("progress", ProgressSchema);
