import express from "express";
import { validationResult } from "express-validator";
import Animal from "../models/Animal.js";

const router = express.Router();

export const createAnimal = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const animal = new Animal({
      name: req.body.name,
      type: req.body.type,
      age: req.body.age,
      owner: req.user.userId,
    });
    await animal.save();

    res.status(200).json(animal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAnimals = async (req, res) => {
  try {
    const animals = await Animal.find({ owner: req.user.userId });
    res.json(animals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAnimal = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (animal.owner != req.user.userId)
      return res.status(403).json({ message: "Access denied." });
    res.json(animal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAnimal = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let animal = await Animal.findById(req.params.id);
    if (animal.owner != req.user.userId)
      return res.status(403).json({ message: "Access denied." });

    animal = await Animal.findOneAndUpdate(
      { _id: req.params.id },
      { name: req.body.name, type: req.body.type, age: req.body.age },
      { returnOriginal: false }
    );

    res.status(200).json(animal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAnimal = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (animal.owner != req.user.userId)
      return res.status(403).json({ message: "Access denied." });

    await Animal.deleteOne({ _id: animal.id });
    res.json(animal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
