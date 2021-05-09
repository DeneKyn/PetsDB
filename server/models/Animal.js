import mongoose from "mongoose";

const animalSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

let Animal = mongoose.model("Animal", animalSchema);

export default Animal;
