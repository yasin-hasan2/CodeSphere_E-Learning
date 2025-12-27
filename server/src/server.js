import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseCourseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";

// call database connection
connectDb();

const app = express();
const PORT = process.env.PORT || 6000;

// Default middleware
app.use(express.json());
app.use(cookieParser());
const allowedOrigins = ["http://localhost:5173", "http://localhost:3000"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// middleware to parse JSON request body
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/purchase", purchaseCourseRoute);
app.use("/api/v1/course-progress", courseProgressRoute);

// test route
app.get("/home", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to CodeSphere LMS",
  });
});

// start the server

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
