const express = require("express");
const router = express.Router();

const Habit = require("../models/Habit");
const Completion = require("../models/Completion");

const { verifyToken } = require("../middleware/auth");

//@route GET api/habits/
//@desc list all habits belong to the current user
//access private
router.get("/", verifyToken, async (req, res) => {
  const { userId } = req.body;

  try {
    const habits = await Habit.find({ userId });

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

//@route POST api/habits/
//@desc create a new habit
//access private
router.post("/", verifyToken, async (req, res) => {
  const { name, description, goalValue, goalFrequency, reminderTime, userId } =
    req.body;

  // Simple validation
  if (!name)
    return res.status(400).json({ success: false, message: "Missing name" });

  try {
    const newHabit = new Habit({
      name,
      description,
      goalValue,
      goalFrequency,
      reminderTime,
      completed: false,
      userId,
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

//@route PUT api/habits/:id
//@desc update a habit
//access private
router.put("/:id", verifyToken, async (req, res) => {
  const {
    name,
    description,
    goalValue,
    goalFrequency,
    reminderTime,
    completed,
    userId,
  } = req.body;

  // Simple validation
  if (!name)
    return res.status(400).json({ success: false, message: "Missing name" });

  try {
    let updatedHabit = {
      name,
      description,
      goalValue,
      goalFrequency,
      reminderTime,
      completed,
      userId,
    };

    const habitUpdateCondition = { _id: req.params.id, userId };

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

//@route DELETE api/habits/:id
//@desc delete a habit
//access private
router.delete("/:id", verifyToken, async (req, res) => {
  const { userId } = req.body;

  try {
    const habitDeleteCondition = { _id: req.params.id, userId };

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

// View progress of a habit
router.get("/:habitId/progress", async (req, res) => {
  const { habitId } = req.params;

  console.log("Get progress");

  try {
    // Check if there's already a progress entry for this habit and date
    let progress = await Completion.find({ habitId: habitId });

    return res.json({
      success: true,
      message: "Progress retrieved successfully",
      data: progress,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

// Update progress for a habit on a specific day
router.put("/:habitId/progress", async (req, res) => {
  const { habitId } = req.params;
  const { date } = req.body;

  try {
    // Check if there's already a progress entry for this habit and date
    let completion = await Completion.findOne({ habitId: habitId, date });

    if (!completion) {
      // If not, create a new entry
      completion = new Completion({
        date,
        habitId,
      });
      await completion.save();
    } else {
      // If there's an existing entry, delete it
      const deletedCompletion = await Completion.findOneAndDelete({
        date,
        habitId: habitId,
      });
    }

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

module.exports = router;
