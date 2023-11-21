const Habit = require("../models/Habit");
const Completion = require("../models/Completion"); // Import the Completion model if needed
const Result = require("../models/Result"); // Import the Result model if needed
const calculateResults = require("../services/calculateResults");

async function recalculateResults(habitId, inception_date) {
  //check if the habit exists
  const habit = await Habit.findOne({ _id: habitId });

  if (!habit) {
    return res.status(404).json({
      success: false,
      message: "Habit not found",
    });
  }

  //find the first day that the results need to be re-calculated
  // Get the completions sorted by result_date
  const results = await Result.find({
    habit: habitId,
    need_to_recalculate: 1,
    result_date: { $gte: inception_date },
  }).sort({ completion_date: 1 });

  const start_date = results[0].result_date;
  const current_date = new Date();

  await calculateResults(habitId, start_date, current_date);
}

module.exports = recalculateResults;
