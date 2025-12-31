import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

// import routes

import userRoutes from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseCourseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";

// call database connection
connectDb();

const app = express();
const PORT = process.env.PORT || 6000;

const __dirname = path.resolve();

// Default middleware
app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  "http://localhost:6001",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, false); // ❗ NO ERROR THROW
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

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../client/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../client/dist/index.html"));
//   });
// }

if (process.env.NODE_ENV === "production") {
  const clientPath = path.join(__dirname, "../client/dist");

  app.use(express.static(clientPath));

  app.use((req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
  });
}
// else {
//   app.get("/", (req, res) => {
//     res.send("API is running....");
//   });
// }

// start the server

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
