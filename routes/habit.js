const express = require("express");
const { body, check, validationResult } = require("express-validator");
const router = express.Router();
require("express-async-errors");

const Habit = require("../models/Habit");
const Completion = require("../models/Completion");
const Result = require("../models/Result");
const User = require("../models/User");

const { verifyToken } = require("../middleware/auth");
const jwt = require("jsonwebtoken");

// Function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//@route GET api/habits/
//@desc list all habits belong to the current user
//access private
router.get("/me", verifyToken, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userId = req.userId;

  const habits = await Habit.find({ user: userId })
    .populate("completions")
    .populate("results");

  res.json({
    success: true,
    message: "Habits retrieved successfully",
    data: {
      habits: habits,
    },
  });
});

//@route GET api/habits/:id
//@desc Get a habit by its ID
//access private
router.get("/:id", verifyToken, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userId = req.userId;
  const habitId = req.params.id;

  const habit = await Habit.findOne({ _id: habitId, user: userId })
    .populate("completions")
    .populate("results");

  if (!habit) {
    return res.status(404).json({
      success: false,
      message: "Habit not found",
    });
  }

  res.json({
    success: true,
    message: "Habit retrieved successfully",
    data: {
      habit: habit,
    },
  });
});

//@route POST api/habits/
//@desc create a new habit
//access private
router.post(
  "/",
  verifyToken,
  [
    check("description").not().isEmpty().withMessage("Missing description"),
    check("type").not().isEmpty().withMessage("Missing type"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { description, type } = req.body;
    const userId = req.userId;

    const newHabit = new Habit({
      description: capitalizeFirstLetter(description),
      type: type ? type : "good",
      user: userId,
    });

    await newHabit.save();

    return res.json({
      success: true,
      message: "Habit created successfully",
      data: newHabit,
    });
  }
);

//@route PUT api/habits/:id
//@desc update a habit
//access private
router.put(
  "/:id",
  verifyToken,
  [
    check("description").not().isEmpty().withMessage("Missing description"),
    check("type").not().isEmpty().withMessage("Missing type"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { description, type } = req.body;
    const userId = req.userId;

    let updatedHabit = {
      description: capitalizeFirstLetter(description),
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
  }
);

//@route DELETE api/habits/:id
//@desc delete a habit
//access private
router.delete("/:id", verifyToken, async (req, res) => {
  const userId = req.userId;

  const habitDeleteCondition = { _id: req.params.id, user: userId };

  const deletedHabit = await Habit.findOneAndDelete(habitDeleteCondition);

  if (!deletedHabit)
    return res.status(401).json({
      success: false,
      message: "Habit not found or user not authorized",
    });

  // Delete the associated completions
  await Completion.deleteMany({ habit: req.params.id });

  // Delete the associated completions
  await Result.deleteMany({ habit: req.params.id });

  return res.json({
    success: true,
    message: "Habit deleted successfully",
    data: deletedHabit,
  });
});

//@route GET api/habits/:id/completions
//@desc Get all completions of a habit by its ID
//access private
router.get("/:id/completions", verifyToken, async (req, res) => {
  const habitId = req.params.id;
  const userId = req.userId;

  const habit = await Habit.findOne({ _id: habitId, user: userId });

  if (!habit) {
    return res.status(404).json({
      success: false,
      message: "Habit not found",
    });
  }

  const completions = await Completion.find({ habit: habitId });

  res.json({
    success: true,
    message: "Completions retrieved successfully",
    data: completions,
  });
});

// Track a habit on a specific day
router.put(
  "/:id/completions",
  verifyToken,
  //add validation for completion_date and complete
  [
    check("completion_date")
      .not()
      .isEmpty()
      .withMessage("Missing completion_date"),
    check("complete").not().isEmpty().withMessage("Missing complete"),
  ],
  async (req, res) => {
    const habitId = req.params.id;

    let completion_date = new Date(req.body.completion_date);
    completion_date.setUTCHours(7, 0, 0, 0); // set the time to 00:00:00.000

    const today = new Date();
    today.setUTCHours(7, 0, 0, 0); // set the time to 00:00:00.000

    const complete = req.body.complete;
    const userId = req.userId;

    //find the result
    let foundCompletion = await Completion.findOne({
      completion_date: completion_date.setUTCHours(7, 0, 0, 0),
      habit: habitId,
    });

    if (foundCompletion) {
      // If there's an existing entry, update it
      let updatedCompletion = {
        complete: complete,
      };

      const completionUpdateCondition = {
        completion_date: completion_date,
        habit: habitId,
      };

      updatedCompletion = await Completion.findOneAndUpdate(
        completionUpdateCondition,
        updatedCompletion,
        { new: true }
      );

      return res.json({
        success: true,
        message: "Completion updated successfully",
        data: updatedCompletion,
      });
    } else {
      console.log("running track habit");
      console.log("completion_date");
      console.log(completion_date);
      console.log("today");
      console.log(today);

      if (completion_date > today) {
        return res.status(400).json({
          success: false,
          message: "Completion date cannot be in the future",
        });
      }

      // If there's not an existing entry, create it
      const newCompletion = new Completion({
        completion_date: completion_date,
        complete: complete,
        user: userId,
        habit: habitId,
      });

      await newCompletion.save();

      // Update the habit to include the new completion
      await Habit.findByIdAndUpdate(habitId, {
        $push: { completions: newCompletion._id },
      });

      return res.json({
        success: true,
        message: "Completion created successfully",
        data: newCompletion,
      });
    }
  }
);

module.exports = router;
