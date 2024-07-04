const { Router } = require("express");
const userRouter = Router();
const userModel = require("../configs/models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

userRouter.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    //input validation
    if (!email || !username || !password) {
      return res
        .status(400)
        .send("Missing information. Fill in all the fields!");
    }
    const emailExists = await userModel.findOne({ email: email });
    if (emailExists) {
      return res.status(408).send("Email already in use!");
    }
    const usernameExists = await userModel.findOne({ username: username });
    if (usernameExists) {
      return res.status(409).send("Username unavailable!");
    }
    //password hashing

    const hashedPassword = bcrypt.hash(password, 12, async (err, hashed) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        const user = new userModel({
          email,
          username,
          password: hashed,
        });
        await user.save();
      }
    });
    res.status(201).send("User registered successfully!");
  } catch (error) {
    res.status(500).send(error);
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send("Missing information. Fill in all the fields!");
    }
    const userExists = await userModel.findOne({ email: email });
    if (!userExists) {
      return res.status(400).send("User not registered, sign up first!");
    }

    bcrypt.compare(password, userExists.password, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        if (result) {
          jwt.sign(
            {
              email: userExists.email,
              password: userExists.password,
              role: userExists.role,
            },
            process.env.JWT_SECRET,
            (err, token) => {
              if (err) {
                res.status(500).send(err);
              } else {
                res.status(200).send({ accessToken: token });
              }
            }
          );
        } else {
          res.status(400).send("Wrong password!");
        }
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = userRouter;
