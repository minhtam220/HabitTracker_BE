//explain the following codes
//write the comments for all of the following codes
require("express-async-errors");

// Import the dotenv module to read the .env file
require("dotenv").config();

// Import the auth router module from the 'auth' file in the 'routes' directory.
const authRouter = require("./routes/auth");

// Import the habit router module from the 'habit' file in the 'routes' directory.
const habitRouter = require("./routes/habit");

// Import the instruction router module from the 'instruction' file in the 'routes' directory.
const instructionRouter = require("./routes/instruction");

// Import the motivation router module from the 'motivation' file in the 'routes' directory.
const motivationRouter = require("./routes/motivation");

// Connect to MongoDB
const mongoose = require("mongoose");

// Function to connect to the MongoDB database
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@myatlasclusteredu.gzndowe.mongodb.net/habit_tracker`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

// Call the connectDB function to establish a connection to MongoDB
connectDB();

// Create an instance of the Express application
const express = require("express");
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Parse incoming JSON data
app.use(express.json());

// Define routes for authentication
app.use("/api/auth", authRouter);

/*
// Define routes for setting
app.use("/api/auth", authRouter);

// Define routes for cycle
app.use("/api/auth", authRouter);

// Define routes for motivation
app.use("/api/auth", authRouter);
*/

// Define routes for habit
app.use("/api/habits", habitRouter);

// Define routes for instruction
app.use("/api/instructions", instructionRouter);

// Define routes for instruction
app.use("/api/motivations", motivationRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ success: false, message: "Internal server error" });
});

// Start the server
const PORT = 2000;
app.listen(PORT, () => console.log(`Server is started on port ${PORT}`));
