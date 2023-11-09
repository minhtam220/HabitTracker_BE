const express = require("express");
const router = express.Router();
const Instruction = require("../models/Instruction"); // Assuming you have a model named Instruction

// returns all instructions using verifyToken middleware

// Get all instructions
router.get("/", async (req, res) => {
  const { stage, day } = req.body;

  try {
    const instruction = await Instruction.find({ stage, day });

    console.log(instruction);

    return res.json({
      success: true,
      message: "Instruction retrieved successfully",
      data: {
        instruction: instruction,
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
