import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getCourseProgress,
  markCourseAsCompleted,
  markCourseAsIncomplete,
  updateLectureProgress,
} from "../controller/courseProgress.controller.js";

const router = express.Router();

router.route("/:courseId").get(isAuthenticated, getCourseProgress);
router
  .route("/:courseId/lecture/:lectureId/view")
  .post(isAuthenticated, updateLectureProgress);
router
  .route("/:courseId/complete")
  .post(isAuthenticated, markCourseAsCompleted);
router
  .route("/:courseId/incomplete")
  .post(isAuthenticated, markCourseAsIncomplete);

export default router;
