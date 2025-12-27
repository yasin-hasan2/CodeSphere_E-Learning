import { Course } from "../models/course.model.js";
import { CourseProgress } from "../models/courseProgress.js";

export const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    // step 1: find course progress by userId and courseId
    const courseProgress = await CourseProgress.findOne({ userId, courseId })
      .populate("courseId")
      .populate("lecturesProgress.lectureId");

    const courseDetails = await Course.findById(courseId).populate("lectures");

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // step 2: if not found, create a new course progress
    if (!courseProgress) {
      return res.status(200).json({
        success: true,
        data: {
          course: courseDetails,
          courseProgress: [],
          completed: false,
        },
      });

      //   const newCourseProgress = new CourseProgress({
      //     userId,
      //     courseId,
      //     completed: false,
      //     lecturesProgress: courseDetails.lectures.map((lectureId) => ({
      //       lectureId,
      //       viewed: false,
      //     })),
      //   });
    }

    // step 3: return the course progress
    return res.status(200).json({
      success: true,
      data: {
        course: courseDetails,
        courseProgress: courseProgress.lecturesProgress,
        completed: courseProgress.completed,
      },
    });
  } catch (error) {
    console.error("Error in getCourseProgress:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateLectureProgress = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;
    const userId = req.id;

    // fetch course progress
    let courseProgress = await CourseProgress.findOne({ userId, courseId });

    if (!courseProgress) {
      // if not progress exists, create a new one
      courseProgress = new CourseProgress({
        userId,
        courseId,
        completed: false,
        lecturesProgress: [],
      });
    }

    // find lecture progress
    const lectureIndex = courseProgress.lecturesProgress.findIndex(
      (lecture) => lecture.lectureId === lectureId
    );
    if (lectureIndex !== -1) {
      // if lecture progress not found, add new lecture progress

      courseProgress.lecturesProgress[lectureIndex].viewed = true;
    } else {
      // add new lecture progress
      courseProgress.lecturesProgress.push({
        lectureId,
        viewed: true,
      });
    }

    // if all lecture is completed, mark course as completed
    const lectureProgressLength = courseProgress.lecturesProgress.filter(
      (lectureProg) => lectureProg.viewed
    ).length;
    const course = await Course.findById(courseId);

    // if all lecture is completed, mark course as completed
    if (course.lectures.length === lectureProgressLength) {
      courseProgress.completed = true;
    }
    // same as above====
    // if (lectureProgressLength === courseProgress.lecturesProgress.length) {
    //   courseProgress.completed = true;
    // }

    await courseProgress.save();
    return res.status(200).json({
      success: true,
      message: "Lecture progress updated successfully",
      //   data: courseProgress,
    });
  } catch (error) {
    console.error("Error in updateLectureProgress:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const markCourseAsCompleted = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    // fetch course progress
    let courseProgress = await CourseProgress.findOne({ userId, courseId });

    if (!courseProgress) {
      return res.status(404).json({
        success: false,
        message: "Course progress not found",
      });
    }

    courseProgress.lecturesProgress.map(
      (lectureProgress) => (lectureProgress.viewed = true)
    );
    courseProgress.completed = true;
    await courseProgress.save();

    return res.status(200).json({
      success: true,
      message: "Course marked as completed successfully",
      //   data: courseProgress,
    });
  } catch (error) {
    console.log("Error in markCourseAsCompleted:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// 14:21
export const markCourseAsIncomplete = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { userId } = req.id;

    // fetch course progress
    let courseProgress = await CourseProgress.findOne({ userId, courseId });
    if (!courseProgress) {
      return res.status(404).json({
        success: false,
        message: "Course progress not found",
      });
    }
    courseProgress.lecturesProgress.map(
      (lectureProgress) => (lectureProgress.viewed = false)
    );
    courseProgress.completed = false;
    await courseProgress.save();
    return res.status(200).json({
      success: true,
      message: "Course marked as incomplete successfully",
      data: courseProgress,
    });
  } catch (error) {
    console.log("Error in markCourseAsIncomplete:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
