const express = require("express");
const router = express.Router();

const Habit = require("../models/Habit");

const Result = require("../models/Result");

const { verifyToken } = require("../middleware/auth");

//@route GET api/habits/
//@desc list all habits belong to the current user
//access private
router.get("/", verifyToken, async (req, res) => {
  const { userId } = req.body;

  console.log(userId);

  try {
    const habits = await Habit.find({ user: userId });

    console.log("Habits are" + habits);

    return res.json({
      success: true,
      message: "Habits retrieved successfully",
      data: {
        habits: habits,
        count: habits.length, // Add the count property
      },
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
  const { description, type, userId } = req.body;

  // Simple validation
  if (!description)
    return res
      .status(400)
      .json({ success: false, message: "Missing description" });

  try {
    const newHabit = new Habit({
      description,
      type,
      user: userId,
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
  const { description, type, userId } = req.body;

  // Simple validation
  if (!description)
    return res
      .status(400)
      .json({ success: false, message: "Missing description" });

  try {
    let updatedHabit = {
      description,
      type,
    };

    const habitUpdateCondition = { _id: req.params.id, user: userId };

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
    const habitDeleteCondition = { _id: req.params.id, user: userId };

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
    let progress = await Result.find({ habitId: habitId });

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

// Track a habit on a specific day
router.put("/:habitId/track", async (req, res) => {
  const { habitId } = req.params;
  const { result_date, complete } = req.body;

  try {
    //find the result
    let result = await Result.findOne({ habit: habitId, result_date });

    console.log(result);

    if (!result) {
      return res.status(401).json({
        success: false,
        message: "Habit not found or user not authorized",
      });
    } else {
      // If there's an existing entry, update it
      const updatedResult = await Result.findOneAndUpdate({
        result_date,
        complete,
        habit: habitId,
      });
    }

    return res.json({
      success: true,
      message: "Habit tracked successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
