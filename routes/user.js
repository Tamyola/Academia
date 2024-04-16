const express = require("express");
const router = express.Router();
const Acad = require("../models/acad");
const bcrypt = require("bcryptjs");

router.post("/signup", async (req, res) => {
  const { email, username, password } = req.body;

  if (password.length < 6) {
    return res.status(400).json({ message: "Password less than 6 characters" });
  }

  try {
    const user = await Acad.findOne({ email });
    if (user) {
      res.status(400).json({
        message: "User exists",
      });
    } else {
      bcrypt.hash(password, 10).then(async (hash) => {
        await Acad.create({
          email,
          username,
          password: hash,
        })
          .then((user) =>
            res.status(200).json({
              message: "User successfully created",
              user,
            })
          )
          .catch((error) =>
            res.status(400).json({
              message: "User not successful created",
              error: error.message,
            })
          );
      });
    }
  } catch (err) {
    res.status(401).json({
      message: "User not successful created",
      error:err.message,
    });
  }
});



router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Username or Password not present",
    });
  }
  try {
    const user = await Acad.findOne({ username });
    if (!user) {
      res.status(400).json({
        message: "Login not successful",
        error: "User not found",
      });
    } else {
      // comparing given password with hashed password
      bcrypt.compare(password, user.password).then(function (result) {
        result
          ? res.status(200).json({
              message: "Login successful",
              user,
            })
          : res.status(400).json({ message: "Login not succesful" });
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
});

module.exports = router;

