const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompletionSchema = new Schema({
  completion_date: {
    type: Date,
    required: true,
  },
  habit: {
    type: Schema.Types.ObjectId,
    ref: "habits",
    required: true,
  },
  complete: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("completions", CompletionSchema);
