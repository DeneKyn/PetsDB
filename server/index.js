import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import animalRoutes from "./routes/animals.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/animals", animalRoutes);

if (process.env.NODE_ENV === "production") {
  console.log(process.env.BASE_URL);
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
  console.log(path.join(__dirname, "../client/build/index.html"));
}

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
