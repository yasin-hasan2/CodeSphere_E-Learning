import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
  {
    lectureTitle: {
      type: String,
      required: true,
    },
    lectureOfCourse: {
      type: String,
      // type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    lectureDescription: {
      type: String,
    },
    lectureContent: {
      type: String,
    },
    lectureNotes: {
      type: String,
    },
    videoUrl: {
      type: String,
    },
    videoDuration: {
      type: String,
    },
    videoType: {
      type: String,
      enum: ["upload", "youtube", "vimeo"],
      default: "upload",
    },
    publicId: {
      type: String,
    },
    isPreviewFree: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Lecture = mongoose.model("Lecture", lectureSchema);

export default Lecture;
