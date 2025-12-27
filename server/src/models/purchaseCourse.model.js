import mongoose from "mongoose";
const CoursePurchaseSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    paymentId: {
      type: String,
      required: true,
    },
    purchaseDate: {
      type: Date,
      default: Date.now,
    },
    expiryDate: {
      type: Date,
      enum: ["30 days", "60 days", "90 days"],
      default: () => new Date(+new Date() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const CoursePurchase = mongoose.model("CoursePurchase", CoursePurchaseSchema);
export default CoursePurchase;
