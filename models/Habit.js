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
  results: [
    {
      type: Schema.Types.ObjectId,
      ref: "Result",
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("habits", HabitSchema);
