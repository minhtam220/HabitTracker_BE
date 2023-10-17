const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MotivationSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("quotes", MotivationSchema);
