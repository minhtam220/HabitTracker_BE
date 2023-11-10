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

CompletionSchema.post("save", async function (doc) {
  //Calculate the total completions for the habit
  await calculateResults(doc);
});

CompletionSchema.post("findOneAndUpdate", async function (doc) {
  //Calculate the total completions for the habit
  await calculateResults(doc);
});

async function calculateResults(doc) {
  const start_date = new Date("2023-11-06T07:00:00Z");
  const completion_date = new Date(doc.completion_date);
  completion_date.setUTCHours(7, 0, 0, 0); // set the time to 00:00:00.000
  const end_date = new Date();
  end_date.setUTCHours(7, 0, 0, 0); // set the time to 00:00:00.000

  console.log("running calculateResults");
  console.log("start_date");
  console.log(start_date.toISOString());
  console.log("completion_date");
  console.log(completion_date.toISOString());
  console.log("end_date");
  console.log(end_date.toISOString());

  //re-calculate the results from  completion_date to end date
  for (let d = completion_date; d <= end_date; d.setDate(d.getDate() + 1)) {
    await calculateSingleResult(doc, start_date, d);
  }
}

async function calculateSingleResult(doc, start_date, given_date) {
  //calculate the result for a given date and habit
  const Completion = mongoose.model("Completion");
  const habitId = doc.habit;

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
      user: doc.user,
    });

    await newResult.save();
  }
}

module.exports = mongoose.model("Completion", CompletionSchema);
