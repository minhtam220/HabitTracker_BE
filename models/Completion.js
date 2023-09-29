const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompletionSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  habitId: {
    type: Schema.Types.ObjectId,
    ref: "habits",
    required: true,
  },
});

module.exports = mongoose.model("completions", CompletionSchema);
