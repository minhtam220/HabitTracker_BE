const express = require("express");
const router = express.Router();

const Progress = require("../models/Progress"); // Assuming you have a Progress model

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

module.exports = router;
