import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  registerDate: {
    type: Date,
    require: true,
    default: Date.now(),
  },
  isСonfirm: {
    type: Boolean,
    default: false,
  },
});

let User = mongoose.model("User", userSchema);

export default User;
