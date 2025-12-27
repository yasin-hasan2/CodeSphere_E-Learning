import Stripe from "stripe";
import { Course } from "../models/course.model.js";
import CoursePurchase from "../models/purchaseCourse.model.js";
import Lecture from "../models/lacture.model.js";
import { User } from "../models/user.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.id;
    // const { courseId, amount, currency, success_url, cancel_url } = req.body;
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Create a new course purchase record with status 'pending'
    const newPurchase = new CoursePurchase({
      courseId: course._id,
      userId: userId,
      amount: course.coursePrice,
      paymentId: "temp_payment_id", // Temporary, will be updated after payment
      status: "pending",
      purchaseDate: new Date(),
      expiryDate: new Date(+new Date() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    });

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: course.courseTitle,
              images: [course.courseThumbnail],
            },
            unit_amount: course.coursePrice * 100, // Amount in paise (lowest denomination)
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/course-progress/${courseId}`, // once payment successful redirect to course progress page
      cancel_url: `${process.env.FRONTEND_URL}/course-detail/${courseId}`,
      metadata: {
        courseId: courseId,
        userId: userId,
      },
      shipping_address_collection: {
        allowed_countries: ["IN"], // Optionally restrict allowed countries
      },
    });

    if (!session.url) {
      return res
        .status(400)
        .json({ success: false, message: "Error while creating session" });
    }

    // Save the purchase record
    newPurchase.paymentId = session.id;
    await newPurchase.save();

    return res.status(200).json({
      success: true,
      url: session.url, // Return the Stripe checkout URL
    });
  } catch (error) {
    console.log(error);
  }
};

export const stripeWebhook = async (req, res) => {
  let event;

  try {
    const payloadString = JSON.stringify(req.body, null, 2);
    const secret = process.env.WEBHOOK_ENDPOINT_SECRET;

    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret,
    });

    event = stripe.webhooks.constructEvent(payloadString, header, secret);
  } catch (error) {
    console.error("Webhook error:", error.message);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  // Handle the checkout session completed event
  if (event.type === "checkout.session.completed") {
    console.log("check session complete is called");

    try {
      const session = event.data.object;

      const purchase = await CoursePurchase.findOne({
        paymentId: session.id,
      }).populate({ path: "courseId" });

      if (!purchase) {
        return res.status(404).json({ message: "Purchase not found" });
      }

      if (session.amount_total) {
        purchase.amount = session.amount_total / 100;
      }
      purchase.status = "completed";

      // Make all lectures visible by setting `isPreviewFree` to true
      if (purchase.courseId && purchase.courseId.lectures.length > 0) {
        await Lecture.updateMany(
          { _id: { $in: purchase.courseId.lectures } },
          { $set: { isPreviewFree: true } }
        );
      }

      await purchase.save();

      // Update user's enrolledCourses
      await User.findByIdAndUpdate(
        purchase.userId,
        { $addToSet: { enrolledCourses: purchase.courseId._id } }, // Add course ID to enrolledCourses
        { new: true }
      );

      // Update course to add user ID to enrolledStudents
      await Course.findByIdAndUpdate(
        purchase.courseId._id,
        { $addToSet: { enrolledStudents: purchase.userId } }, // Add user ID to enrolledStudents
        { new: true }
      );
    } catch (error) {
      console.error("Error handling event:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  res.status(200).send();
};

export const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;
    // console.log("Course ID:", courseId);

    const course = await Course.findById(courseId)
      .populate({ path: "lectures" })
      .populate({ path: "courseTeacher", select: "name email photoUrl" });

    const purchased = await CoursePurchase.findOne({
      courseId: courseId,
      userId: userId,
      status: "completed",
    });

    // console.log("Purchased Record:", purchased);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    // Return the course details along with the purchased status
    if (purchased) {
      return res.status(200).json({ course, isPurchased: true });
    } else {
      return res.status(200).json({ course, isPurchased: false });
    }

    // return res.status(200).json({ course, purchased: !!purchased });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllPurchasedCourses = async (req, res) => {
  try {
    const purchasedCourses = await CoursePurchase.find({
      userId: req.id,
      status: "completed",
    }).populate({
      path: "courseId",
      populate: { path: "courseTeacher", select: "name email photoUrl" },
    });

    if (!purchasedCourses) {
      return res
        .status(404)
        .json({ message: "No purchased courses found", purchasedCourses: [] });
    }

    return res.status(200).json({ purchasedCourses });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
