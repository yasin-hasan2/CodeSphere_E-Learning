import { Course } from "../models/course.model.js";
import Lecture from "../models/lacture.model.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;
    if (!courseTitle || !category) {
      return res.status(400).json({
        success: false,
        message: "Course Title and category  are required",
      });
    }

    const course = await Course.create({
      courseTitle,
      category,
      courseTeacher: req.id,
    });

    return res.status(201).json({
      success: true,
      course,
      message: "Course created successfully",
    });
  } catch (error) {
    console.log("createCourse Error", error);
    return res.status(500).json({
      success: false,
      message: "createCourse controller: " + error.message,
    });
  }
};

export const searchCourses = async (req, res) => {
  try {
    const { query = "", category = [], sortByPrice = "" } = req.query;

    const categories = Array.isArray(category) ? category : [category];
    // create search filter
    const searchCriteria = {
      isPublished: true,
      $or: [
        { courseTitle: { $regex: query, $options: "i" } },
        { subTitle: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    };

    // if categories are selected
    if (categories.length > 0) {
      searchCriteria.category = { $in: categories };
    }

    // define sorting order
    let sortOptions = {};
    if (sortByPrice === "low") {
      sortOptions.coursePrice = 1; // short by price ascending
    } else if (sortByPrice === "high") {
      sortOptions.coursePrice = -1; // short by price descending
    }

    let courses = await Course.find(searchCriteria).sort(sortOptions).populate({
      path: "courseTeacher",
      select: "name email photoUrl",
    });

    return res.status(200).json({
      success: true,
      courses: courses || [],
      message: "Courses fetched successfully",
    });
  } catch (error) {
    console.log("searchCourses Error", error);
    return res.status(500).json({
      success: false,
      message: "searchCourses controller: " + error.message,
    });
  }
};

// Get all published courses
export const getPublishedCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true }).populate({
      path: "courseTeacher",
      select: "name email photoUrl",
    });
    if (!courses) {
      return res.status(404).json({
        courses: [],
        message: "No published courses found",
      });
    }

    return res.status(200).json({
      success: true,
      courses,
      message: "Published courses fetched successfully",
    });
  } catch (error) {
    console.log("get Published courses error ", error);
    return res.status(500).json({
      success: false,
      message: "getPublishedCourses controller: " + error.message,
    });
  }
};

// Get all courses created by the logged-in instructor
export const getCreatorCourse = async (req, res) => {
  try {
    const userId = req.id;
    const courses = await Course.find({ courseTeacher: userId });

    if (!courses) {
      return res.status(404).json({
        courses: [],
        message: "No courses found",
      });
    }
    return res.status(200).json({
      success: true,
      courses,
      message: "Courses fetched successfully",
    });
  } catch (error) {
    console.log("get All admin courses error ", error);
    return res.status(500).json({
      success: false,
      message: "getAllAdminCourses controller: " + error.message,
    });
  }
};

export const editCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
    } = req.body;
    const thumbnail = req.file;

    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    let courseThumbnail;
    if (thumbnail) {
      if (course.courseThumbnail) {
        const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
        console.log("publicId", publicId);
        await deleteMediaFromCloudinary(publicId); // delete old thumbnail
      }
      // upload new thumbnail if provided
      courseThumbnail = await uploadMedia(thumbnail.path);
    }

    // prepare updated data
    const updatedData = {
      courseTitle: courseTitle || course.courseTitle,
      subTitle: subTitle || course.subTitle,
      description: description || course.description,
      category: category || course.category,
      courseLevel: courseLevel || course.courseLevel,
      coursePrice: coursePrice || course.coursePrice,
      // courseThumbnail: thumbnail ? thumbnail.path : course.courseThumbnail,
      courseThumbnail: courseThumbnail?.secure_url || course.courseThumbnail,
    };

    // update course
    course = await Course.findByIdAndUpdate(courseId, updatedData, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      course,
      message: "Course updated successfully",
    });
  } catch (error) {
    console.log("edit course failed", error);
    return res.status(500).json({
      success: false,
      message: "Edit course failed" + error.message,
    });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    return res.status(200).json({
      success: true,
      course,
      message: "Course fetched successfully",
    });
  } catch (error) {
    console.log("get course by id error", error);
    return res.status(500).json({
      success: false,
      message: "Get course by id error: " + error.message,
    });
  }
};

/// LECTURE CONTROLLERS

export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;

    if (!lectureTitle || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Lecture title and course ID are required",
      });
    }

    const course = await Course.findById(courseId);
    // console.log("course DATA: ", course);

    // Create lecture with course ID
    const lecture = await Lecture.create({
      lectureTitle,
      lectureOfCourse: course?.courseTitle || courseId,
    });

    // Add lecture to course

    if (course) {
      course.lectures.push(lecture._id);
      await course.save();
    }

    return res.status(201).json({
      success: true,
      lecture,
      message: "Lecture created successfully",
    });
  } catch (error) {
    console.log("createLecture error", error);
    return res.status(500).json({
      success: false,
      message: "Create lecture error: " + error.message,
    });
  }
};

export const getCourseLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate("lectures");
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      lecture: course.lectures,
    });
  } catch (error) {
    console.log("getLecture error", error);
    return res.status(500).json({
      success: false,
      message: "Get lecture error: " + error.message,
    });
  }
};

export const editLecture = async (req, res) => {
  try {
    const { lectureTitle, videoInfo, isPreviewFree } = req.body;
    const { courseId, lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "Lecture not found",
      });
    }
    // Update lecture details
    if (lectureTitle) {
      lecture.lectureTitle = lectureTitle;
    }
    if (videoInfo?.videoUrl) {
      lecture.videoUrl = videoInfo.videoUrl;
    }
    if (videoInfo?.publicId) {
      lecture.publicId = videoInfo.publicId;
    }

    lecture.isPreviewFree = isPreviewFree;

    await lecture.save();

    // Ensure the course still has the lecture id if it was not already present
    const course = await Course.findById(courseId);
    if (course && !course.lectures.includes(lecture._id)) {
      course.lectures.push(lecture._id);
      await course.save();
    }

    return res.status(200).json({
      success: true,
      lecture,
      message: "Lecture updated successfully",
    });
  } catch (error) {
    console.log("Edit Lecture Error:", error);
    return res.status(500).json({
      success: false,
      message: "Edit Lecture Error: " + error.message,
    });
  }
};

export const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "Lecture not found",
      });
    }
    // delete the lecture from cloudinary if video exists

    if (lecture.publicId) {
      await deleteMediaFromCloudinary(lecture.publicId);
    }

    // delete lecture from any course that contains it
    await Course.updateOne(
      { lectures: lectureId }, // find course containing the lecture
      { $pull: { lectures: lectureId } } // remove lectureId from lectures array
    );

    // await Lecture.findByIdAndDelete(lectureId);
    return res.status(200).json({
      success: true,
      message: "Lecture removed successfully",
    });
  } catch (error) {
    console.log("Remove Lecture Error:", error);
    return res.status(500).json({
      success: false,
      message: "Remove Lecture Error: " + error.message,
    });
  }
};

export const getLectureById = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "Lecture not found",
      });
    }
    return res.status(200).json({
      success: true,
      lecture,
      message: "Lecture retrieved successfully",
    });
  } catch (error) {
    console.log("Get Lecture By Id Error:", error);
    return res.status(500).json({
      success: false,
      message: "Get Lecture By Id Error: " + error.message,
    });
  }
};

/// publish and unpublish course controllers can be added here in future

export const togglePublishCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { publish } = req.query; // expect a boolean value indicating publish or unpublish

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    // Toggle publish status
    course.isPublished = publish === "true";
    await course.save();

    return res.status(200).json({
      success: true,
      course,
      message: `Course has been ${
        publish ? "published" : "unpublished"
      } successfully`,
    });
  } catch (error) {
    console.log("Toggle Publish Course Error:", error);
    return res.status(500).json({
      success: false,
      message: "Toggle Publish Course Error: " + error.message,
    });
  }
};
