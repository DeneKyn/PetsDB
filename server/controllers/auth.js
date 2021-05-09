import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

export const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ message: "This email address is already being used." });

    const hashedPassword = await bcrypt.hash(password, 12);

    user = new User({
      email: email,
      password: hashedPassword,
    });
    await user.save();

    res.status(200).json({ message: "User created successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Incorrect login or password." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect login or password." });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token, userId: user.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
