import express from "express";
import { body } from "express-validator";
import { signUp, signIn } from "../controllers/auth.js";

const router = express.Router();

router.post(
  "/signin",
  body("email", "Invalid email").isEmail(),
  body("password", "Password must contain at least 5 characters").isLength({
    min: 5,
  }),
  signIn
);

router.post(
  "/signup",
  body("email", "Invalid email").isEmail(),
  body("password", "Password must contain at least 5 characters").isLength({
    min: 5,
  }),
  signUp
);

export default router;
