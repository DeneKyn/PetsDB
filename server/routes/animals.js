import express from "express";
import {
  createAnimal,
  getAnimals,
  getAnimal,
  updateAnimal,
  deleteAnimal,
} from "../controllers/animals.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createAnimal);
router.get("/", auth, getAnimals);
router.get("/:id", auth, getAnimal);
router.patch("/:id", auth, updateAnimal);
router.delete("/:id", auth, deleteAnimal);

export default router;
