// Load environment variables from .env file
require("./src/middleware/node_modules/dotenv/lib/main").config();

// Import the authentication router module from the 'auth' file in the 'routes' directory.
const authRouter = require("./routes/auth");

// Import the habit router module from the 'auth' file in the 'routes' directory.
const habitRouter = require("./routes/habit");

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

// Parse incoming JSON data
app.use(express.json());

// Define routes for authentication
app.use("/api/auth", authRouter);

// Define routes for habit
app.use("/api/habits", habitRouter);

// Start the server
const PORT = 4000;
app.listen(PORT, () => console.log(`Server is started on port ${PORT}`));
