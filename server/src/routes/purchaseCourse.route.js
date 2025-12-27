import express from "express";
import {
  createCheckoutSession,
  getAllPurchasedCourses,
  getCourseDetailWithPurchaseStatus,
  stripeWebhook,
} from "../controller/PurchaseCourse.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router
  .route("/checkout/create-checkout-session")
  .post(isAuthenticated, createCheckoutSession); // PurchaseCourseController.createCheckoutSession
router
  .route("/webhook")
  .post(express.raw({ type: "application/json" }), stripeWebhook); // PurchaseCourseController.webhookHandler
router
  .route("/course/:courseId/detail-with-status")
  .get(isAuthenticated, getCourseDetailWithPurchaseStatus); // PurchaseCourseController.getCourseDetailWithStatus
router.route("/").get(isAuthenticated, getAllPurchasedCourses); // PurchaseCourseController.getAllPurchasedCourses

export default router;
