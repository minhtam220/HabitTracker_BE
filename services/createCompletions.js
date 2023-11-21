const cron = require("node-cron");
const Habit = require("../models/Habit");
const Completion = require("../models/Completion");

// Schedule a task to run at 12:01 AM (1 minute past midnight) every day
cron.schedule("1 0 * * *", async () => {
  try {
    // Your task code...
    // Get all habits
    const habits = await Habit.find().populate("user");

    console.log("running createCompletions");

    // For each habit, create a new completion
    for (let habit of habits) {
      console.log(habit.user.email);

      const today = new Date();
      today.setUTCHours(7, 0, 0, 0); // set the time to 00:00:00.000

      const existingCompletion = await Completion.findOne({
        habit: habit._id,
        user: habit.user._id,
        completion_date: today,
      });

      if (!existingCompletion) {
        const newCompletion = new Completion({
          habit: habit._id,
          user: habit.user._id,
          complete: false,
          completion_date: today,
        });

        await newCompletion.save();
      }
    }
  } catch (error) {
    console.error("Error running cron job:", error);
  }
});
