import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { transport, mailBody } from "../service/mailService.js";
import User from "../models/User.js";

const router = express.Router();

export const signUp = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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

    const emailToken = jwt.sign({ userId: user.id }, process.env.EMAIL_SECRET, {
      expiresIn: "1h",
    });
    const url = `${process.env.BASE_URL}/api/auth/confirmation/${emailToken}`;

    const bodyText = `You've almost signed up for the project. You just need to confirm your email.
                      <br>Just click the button below to validate your email address.`;
    transport.sendMail(
      mailBody(
        email,
        url,
        "Confirm Email",
        bodyText,
        "Verify your email address"
      ),
      (error, info) => {
        if (error) {
          throw new Error(error);
        }
        console.log("Message sent: %s", info.messageId);
      }
    );

    res.status(200).json({ message: "User created successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Incorrect login or password." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect login or password." });

    if (!user.isСonfirm)
      return res.status(400).json({ message: "Email not confirmed." });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token, userId: user.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const confirmEmail = async (req, res) => {
  try {
    const token = req.params.token;
    let userId;
    if (!token) return res.status(401).json({ message: "Invalid token" });

    jwt.verify(token, process.env.EMAIL_SECRET, (error, u) => {
      if (error) {
        return res.status(401).json({ message: "Invalid token" });
      }
      userId = u.userId;
    });
    await User.findOneAndUpdate(
      { _id: userId },
      { isСonfirm: true },
      { returnOriginal: false }
    );
    return res.redirect(`${process.env.BASE_URL}/signin`);
  } catch (e) {
    res.status(500).json({ message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "This email does not exist." });
    }

    const reset_token = jwt.sign(
      { userId: user.id },
      process.env.RESET_SECRET,
      {
        expiresIn: "1h",
      }
    );
    const url = `${process.env.BASE_URL}/reset/${reset_token}`;
    const bodyText = `You left a request to reset your password
    Just click the button below to continue.`;
    transport.sendMail(
      mailBody(email, url, "Reset Password", bodyText, "Change password"),
      (error, info) => {
        if (error) {
          //throw new Error(error);
          res.status(500).json({ message: error });
        }
        console.log("Message sent: %s", info.messageId);
        res.status(200).json({ message: "Re-send the password." });
      }
    );
  } catch (e) {
    res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const token = req.params.token;
    const password = req.body.password;
    let userId;
    if (!token) return res.status(401).json({ message: "Invalid token" });

    jwt.verify(token, process.env.RESET_SECRET, (error, u) => {
      if (error) {
        return res.status(401).json({ message: "Invalid token" });
      }
      userId = u.userId;
    });

    const hashedPassword = await bcrypt.hash(password, 12);
    await User.findOneAndUpdate(
      { _id: userId },
      { password: hashedPassword },
      { returnOriginal: false }
    );
    res.json({ message: "Password changed." });
  } catch (e) {
    res.status(500).json({ message: error.message });
  }
};
