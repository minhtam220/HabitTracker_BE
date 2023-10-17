const express = require("express");
const router = express.Router();
const Motivation = require("../models/Motivation"); // Assuming you have a model named Motivation

// Get all motivations
router.get("/", async (req, res) => {
  try {
    const randomMotivation = await Motivation.aggregate([
      { $sample: { size: 1 } },
    ]);

    console.log(randomMotivation);

    return res.json({
      success: true,
      message: "Motivation retrieved successfully",
      data: {
        motivation: randomMotivation[0],
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
