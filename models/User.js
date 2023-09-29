// Import the mongoose library, which is used to interact with MongoDB.
const mongoose = require("mongoose");

// Destructure the Schema class from mongoose.
const Schema = mongoose.Schema;

// Create a new mongoose schema for the User model.
const UserSchema = new Schema({
  // Define the 'username' field in the schema.
  username: {
    type: String, // The data type for this field is a string.
    required: true, // This field is required (must have a value).
    unique: true, // The values in this field must be unique in the collection.
  },
  // Define the 'email' field in the schema.
  email: {
    type: String, // The data type for this field is a string.
    required: true, // This field is required (must have a value).
    unique: true, // The values in this field must be unique in the collection.
  },
  // Define the 'password' field in the schema.
  password: {
    type: String, // The data type for this field is a string.
    required: true, // This field is required (must have a value).
  },
  // Define the 'createdAt' field in the schema.
  createdAt: {
    type: Date, // The data type for this field is a date.
    default: Date.now, // The default value is the current date and time.
  },
});

// Export the mongoose model for the User schema.
// The model is named "users" and corresponds to a MongoDB collection.
module.exports = mongoose.model("users", UserSchema);
