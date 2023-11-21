const Completion = require("../models/Completion");
// replace with your path to the Completion model

async function insertCompletions(habitId, userId, startDate, endDate) {
  // Ensure dates are Date objects
  startDate = new Date(startDate);
  endDate = new Date(endDate);

  console.log("running insertCompletions");

  // Iterate over each day from startDate to endDate
  for (let day = startDate; day <= endDate; day.setDate(day.getDate() + 1)) {
    // Create a new completion
    const newCompletion = new Completion({
      habit: habitId,
      user: userId,
      complete: false,
      completion_date: new Date(day),
    });

    // Save the completion
    await newCompletion.save();
  }
}

// Usage:
insertCompletions(
  "6527ff513bc4769f6b04b3b1",
  "65164604273dec1588a68451",
  "2023-11-01",
  "2023-11-10"
);
