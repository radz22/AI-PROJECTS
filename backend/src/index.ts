import express, { Application } from "express";
import connectDB from "./config/mongodb-connection";
import "dotenv/config";
import cors from "cors";
import geminiRoute from "./routes/geminiRoute";
import googleAuthRouter from "./routes/googleAuthRoute";
import userAuthRouter from "./routes/userAuthRoute";
const app: Application = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());

app.use("/api", geminiRoute);
app.use("/google/auth", googleAuthRouter);
app.use("/user/auth", userAuthRouter);

// Start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
