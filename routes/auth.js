const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const util = require("util");

const genSaltPromise = util.promisify(bcrypt.genSalt);
const hashPromise = util.promisify(bcrypt.hash);

const jwt = require("jsonwebtoken");
const User = require("../models/User");

const { addToBlacklist } = require("./blacklist"); // Assuming you have a blacklist utility

// Load environment variables from .env file
require("dotenv").config();

//@route POST api/auth/register
//@desc register user
//access public
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  //simple validation
  if (!username || !email || !password)
    return res.status(400).json({
      success: false,
      message: "Missing username and/or email and/or password",
    });

  try {
    //check for existing user
    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "Email already taken" });
    }

    //all good, let's hash the password
    let hashedPassword = "";
    const saltRounds = 10; // Number of salt rounds for hashing

    //convert hashPassword to async function
    async function hashPassword() {
      try {
        const salt = await genSaltPromise(saltRounds);
        hashedPassword = await hashPromise(password, salt);
      } catch (err) {
        throw err;
      }
    }

    await hashPassword();

    //create new user in the database
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    //create the token token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
      //{ expiresIn: "60s" }
    );

    //return the success message
    return res.json({
      success: true,
      message: "User created successfully",
      data: newUser,
      accessToken,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

//@route POST api/auth/login
//@desc user login
//access public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  //simple validation
  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing email and/or password" });

  try {
    //check for existing user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    //all good, let's compare the password
    async function verifyPassword(plainPassword, storedHashedPassword) {
      try {
        const match = await new Promise((resolve, reject) => {
          bcrypt.compare(plainPassword, storedHashedPassword, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });

        return match;
      } catch (err) {
        throw err;
      }
    }

    let passwordValid = await verifyPassword(password, user.password);

    console.log("passwordValid: " + passwordValid);

    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });

    //create the token token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
      //{ expiresIn: "60s" }
    );

    //return the success message
    return res.json({
      success: true,
      message: "User logged in successfully",
      data: user,
      accessToken,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

router.post("/logout", (req, res) => {
  const accessToken = req.headers.authorization.split(" ")[1];

  // Add the token to a blacklist
  addToBlacklist(accessToken);

  res.json({
    success: true,
    message: "User logged out successfully",
  });
});

module.exports = router;
