//write a route for result, check the sample of habit.js
//modify the code below to fit the result model

const express = require("express");
const { body, check, validationResult } = require("express-validator");
const router = express.Router();
require("express-async-errors");

const Habit = require("../models/Habit");
const Result = require("../models/Result");
const User = require("../models/User");

const calculateResults = require("../services/calculateResults");

const { verifyToken } = require("../middleware/auth");
const jwt = require("jsonwebtoken");

// Function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//@route GET api/results/
//@desc list the current result belongs to the current user
//access private
router.get("/", verifyToken, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const result_date = new Date();
  result_date.setUTCHours(7, 0, 0, 0); // set the time to 00:00:00.000

  const userId = req.userId;
  const results = await Result.find({
    user: userId,
    result_date: result_date,
  }).populate("habit");

  /*
  console.log("running get result");
  console.log("result_date");
  console.log(result_date);
  */

  res.json({
    success: true,
    message: "Results retrieved successfully",
    data: {
      results: results,
    },
  });
});

//@route GET api/results/calculate
//@desc calculate the current result belongs to the current user
//access private
router.get(
  "/calculate",
  verifyToken,
  //add validation for end_date
  [check("end_date").not().isEmpty().withMessage("Missing end_date")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.userId;
    const habits = await Habit.find({ user: userId });

    //declare start_date
    const start_date = new Date("2023-11-06T07:00:00Z");
    const end_date = req.body.end_date;

    for (let habit of habits) {
      await calculateResults(habit._id, start_date, end_date);
    }

    res.json({
      success: true,
      message: "Results calculated successfully",
    });
  }
);

module.exports = router;
