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

  //declare end_date
  end_date = new Date(end_date);
  end_date.setUTCHours(7, 0, 0, 0); // set the time to 00:00:00.000

  //calculate the dopamines from start date to end date
  //calculate the results from  completion_date to end date
  for (
    let current_date = new Date(start_date);
    current_date <= end_date;
    current_date.setDate(current_date.getDate() + 1)
  ) {
    const { total_good_dopamines, total_bad_dopamines } =
      await calculateDopamines(habitId, start_date, current_date);

    /*
    console.log("calculating dopamines");
    console.log("start date:" + start_date);
    console.log("end date:" + end_date);
    console.log("current date:" + current_date);
    console.log("total good dopamines:" + total_good_dopamines);
    console.log("total bad dopamines:" + total_bad_dopamines);
    console.log("----------------------");
    */

    const { current_streak } = await calculateStreak(
      habitId,
      start_date,
      current_date
    );

    /*
    console.log("calculating streaks");
    console.log("current date:" + current_date);
    console.log("current_streak:" + current_streak);
    console.log("----------------------");
    */

    //find the result
    let result = await Result.findOne({
      result_date: current_date,
      habit: habitId,
    });

    if (result) {
      // If there's an existing entry, update it
      let updatedResult = {
        total_good_dopamines: total_good_dopamines,
        total_bad_dopamines: total_bad_dopamines,
        current_streak: current_streak,
      };

      const resultUpdateCondition = {
        habit: habitId,
        result_date: current_date,
      };

      updatedResult = await Result.findOneAndUpdate(
        resultUpdateCondition,
        updatedResult,
        { new: true }
      );
    } else {
      // If there's not an existing entry, create it
      const newResult = new Result({
        result_date: current_date,
        total_good_dopamines: total_good_dopamines,
        total_bad_dopamines: total_bad_dopamines,
        current_streak: current_streak,
        habit: habitId,
        user: habit.user,
      });

      await newResult.save();
    }

    // Update the need_to_recalculate field in the Result schema
    await Result.updateOne(
      {
        habit: habitId,
        result_date: current_date,
      },
      { need_to_recalculate: 0 }
    );
  }
}

async function calculateDopamines(habitId, start_date, current_date) {
  //calculate the total good dopamines from start date to end date
  const total_good_dopamines = await Completion.countDocuments({
    habit: habitId,
    complete: true,
    good_dopamines: 1,
    completion_date: { $gte: start_date, $lte: current_date },
  });

  const total_bad_dopamines = await Completion.countDocuments({
    habit: habitId,
    complete: true,
    bad_dopamines: 1,
    completion_date: { $gte: start_date, $lte: current_date },
  });

  return { total_good_dopamines, total_bad_dopamines };
}

async function calculateStreak(habitId, start_date, current_date) {
  //calculate the streak from start date to current date
  //calculate the streaks from start date to end date
  let current_streak = 0;

  // Get the completions sorted by completion_date
  const completions = await Completion.find({
    habit: habitId,
    completion_date: { $gte: start_date, $lte: current_date },
  }).sort({ completion_date: 1 });

  /*
  console.log("calculating streaks");
  console.log("current date:" + current_date);
  console.log("completions:" + completions);
  */

  for (let i = 0; i < completions.length; i++) {
    //console.log("completions[i].complete:" + completions[i].complete);
    if (completions[i].complete) {
      if (i + 1 < completions.length) {
        //console.log("completions[i+1].complete:" + completions[i + 1].complete);
        if (completions[i + 1].complete) {
          current_streak++;
        }
      } else {
        current_streak++;
      }
    } else {
      current_streak = 0;
    }
    //console.log("current_streak:" + current_streak);
  }

  /*
  console.log("final current_streak:" + current_streak);
  console.log("----------------------");
  */

  return { current_streak };
}

module.exports = calculateResults;
