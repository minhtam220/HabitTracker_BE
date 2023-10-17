const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SettingSchema = new Schema({
  max_habits: {
    type: Number,
    required: true,
  },
  analyse_duration: {
    type: Number,
    default: 7,
  },
  build_duration: {
    type: Number,
    default: 21,
  },
  check_duration: {
    type: Number,
    default: 7,
  },
  analyse_stage_analyse_page: {
    type: [String],
    enum: ["view", "create", "edit", "track"],
  },
  analyse_stage_build_page: {
    type: [String],
    default: [],
  },
  analyse_stage_check_page: {
    type: [String],
    enum: ["view"],
  },
  build_stage_analyse_page: {
    type: [String],
    enum: ["view"],
  },
  build_stage_build_page: {
    type: [String],
    enum: ["view", "track"],
  },
  build_stage_check_page: {
    type: [String],
    default: [],
  },
  check_stage_analyse_page: {
    type: [String],
    enum: ["view"],
  },
  check_stage_build_page: {
    type: [String],
    enum: ["view"],
  },
  check_stage_check_page: {
    type: [String],
    enum: ["track"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("settings", SettingSchema);
