import express from "express";
import { body } from "express-validator";
import {
  createAnimal,
  getAnimals,
  getAnimal,
  updateAnimal,
  deleteAnimal,
  deleteAnimals,
} from "../controllers/animals.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/",
  auth,
  body("name", "Invalid name").exists(),
  body("type", "Invalid type").exists(),
  body("age", "Invalid age").isInt({ min: 1, max: 99 }),
  createAnimal
);

router.get("/", auth, getAnimals);

router.get("/:id", auth, getAnimal);

router.patch(
  "/:id",
  auth,
  body("name", "Invalid name").exists(),
  body("type", "Invalid type").exists(),
  body("age", "Invalid age").isInt({ min: 1, max: 99 }),
  updateAnimal
);

router.delete("/:id", auth, deleteAnimal);

router.delete("/", auth, deleteAnimals);

export default router;
