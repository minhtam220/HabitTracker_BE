const express = require("express");
const router = express.Router();

const Habit = require("../src/middleware/models/Habit");
const Progress = require("../src/middleware/models/Progress"); // Assuming you have a Progress model

const { verifyToken } = require("../src/middleware/auth");

//@route POST api/habits/
//@desc create habit
//access private
router.post("/", verifyToken, async (req, res) => {
  const { user_id, name, description, goal_type, goal_value, reminder_time } =
    req.body;

  // Simple validation
  if (!name)
    return res.status(400).json({ success: false, message: "Missing name" });

  try {
    const newHabit = new Habit({
      user_id,
      name,
      description,
      goal_type,
      goal_value,
      reminder_time,
    });

    await newHabit.save();

    return res.json({
      success: true,
      message: "Habit created successfully",
      data: newHabit,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

//@route GET api/habits/
//@desc get habits
//access private
router.get("/", verifyToken, async (req, res) => {
  const { user_id } = req.body;

  try {
    const habits = await Habit.find({ user_id });

    return res.json({
      success: true,
      message: "Habits retrieved successfully",
      data: habits,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

//@route PUT api/habits/:id
//@desc update habit
//access private
router.put("/:id", verifyToken, async (req, res) => {
  const { user_id, name, description, goal_type, goal_value, reminder_time } =
    req.body;

  // Simple validation
  if (!name)
    return res.status(400).json({ success: false, message: "Missing name" });

  try {
    let updatedHabit = {
      user_id,
      name,
      description: description || "",
      goal_type,
      goal_value,
      reminder_time,
    };

    const habitUpdateCondition = { _id: req.params.id, user_id };

    updatedHabit = await Habit.findOneAndUpdate(
      habitUpdateCondition,
      updatedHabit,
      { new: true }
    );

    if (!updatedHabit)
      return res.status(401).json({
        success: false,
        message: "Habit not found or user not authorized",
      });

    return res.json({
      success: true,
      message: "Habit updated successfully",
      data: updatedHabit,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

// Get progress for a habit
router.get("/:habitId/progress", async (req, res) => {
  const { habitId } = req.params;

  console.log("Get progress");

  try {
    // Check if there's already a progress entry for this habit and date
    let progresses = await Progress.find({ habit_id: habitId });

    return res.json({
      success: true,
      message: "Progresses retrieved successfully",
      data: progresses,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

// Update progress for a habit on a specific day
router.put("/:habitId/:date", async (req, res) => {
  const { habitId, date } = req.params;
  const { progressValue } = req.body;

  console.log("Update progress");

  try {
    // Check if there's already a progress entry for this habit and date
    let progress = await Progress.findOne({ habit_id: habitId, date });

    if (!progress) {
      // If not, create a new progress entry
      progress = new Progress({
        habit_id: habitId,
        date,
        progress_value: progressValue,
      });
    } else {
      // If there's an existing entry, update it
      progress.progress_value = progressValue;
    }

    await progress.save();

    return res.json({
      success: true,
      message: "Progress updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

//@route DELETE api/habits/:id
//@desc delete habit
//access private
router.delete("/:id", verifyToken, async (req, res) => {
  const { user_id } = req.body;

  try {
    const habitDeleteCondition = { _id: req.params.id, user_id };

    const deletedHabit = await Habit.findOneAndDelete(habitDeleteCondition);

    if (!deletedHabit)
      return res.status(401).json({
        success: false,
        message: "Habit not found or user not authorized",
      });

    return res.json({
      success: true,
      message: "Habit deleted successfully",
      data: deletedHabit,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
