import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    app.listen(PORT, () => {
      console.log(`Server has been stated on port ${PORT}`);
    });
  } catch (error) {
    console.log("Server Error", error.message);
    process.exit(1);
  }
}
start();
