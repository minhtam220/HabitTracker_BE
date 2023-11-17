const Habit = require("../models/Habit");
const Completion = require("../models/Completion"); // Import the Completion model if needed
const Result = require("../models/Result"); // Import the Result model if needed

async function calculateResults(habitId, start_date, end_date) {
  //check if the habit exists
  const habit = await Habit.findOne({ _id: habitId });

  if (!habit) {
    return res.status(404).json({
      success: false,
      message: "Habit not found",
    });
  }

  //declare start_date
  start_date = new Date(start_date);
  start_date.setUTCHours(7, 0, 0, 0); // set the time to 00:00:00.000

  //declare completion_date
  end_date = new Date(end_date);
  end_date.setUTCHours(7, 0, 0, 0); // set the time to 00:00:00.000

  //declare end_date
  const today = new Date();
  today.setUTCHours(7, 0, 0, 0); // set the time to 00:00:00.000

  console.log("running calculateResults");
  console.log("start_date");
  console.log(start_date.toISOString());
  console.log("end_date");
  console.log(end_date.toISOString());
  console.log("today");
  console.log(today.toISOString());

  //re-calculate the results from  completion_date to end date
  for (let d = end_date; d <= today; d.setDate(d.getDate() + 1)) {
    await calculateSingleResult(habit, start_date, end_date);
  }
}

async function calculateSingleResult(habit, start_date, given_date) {
  const habitId = habit._id;

  //calculate the total completions from start date to the given date
  const count = await Completion.countDocuments({
    habit: habitId,
    complete: true,
    completion_date: { $gte: start_date, $lte: given_date },
  });

  console.log("running calculateSingleResult");
  console.log(given_date);
  console.log(count + " completions");

  //find the result
  let result = await Result.findOne({
    result_date: given_date,
    habit: habitId,
  });

  if (result) {
    // If there's an existing entry, update it
    let updatedResult = {
      totalCompletions: count,
    };

    const resultUpdateCondition = {
      habit: habitId,
      result_date: given_date,
    };

    updatedResult = await Result.findOneAndUpdate(
      resultUpdateCondition,
      updatedResult,
      { new: true }
    );
  } else {
    // If there's not an existing entry, create it
    const newResult = new Result({
      result_date: given_date,
      complete: false,
      stage: "analyse",
      habit: habitId,
      totalCompletions: count,
      totalDopamines: 0,
      currentStreak: 0,
      user: habit.user,
    });

    await newResult.save();
  }
}

module.exports = calculateResults;
