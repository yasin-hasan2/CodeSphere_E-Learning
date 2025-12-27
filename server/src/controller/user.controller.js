import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js"; // your JWT utility
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    // check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email ",
      });
    }

    // secure password by bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log("Register controller error ", error);

    return res.status(500).json({
      success: false,
      message: "Register controller " + error.message,
    });
  }
};

// login controller

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist with this email",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate JWT token and send it in response
    // The generateToken function should **not** send another res.json
    // const token = generateToken(user); // return token instead of sending response

    // Only **one response** is sent here
    // return res.status(200).json({
    //   success: true,
    //   message: `Welcome back, ${user.name}! You are logged in successfully`,
    //   user: {
    //     id: user._id,
    //     name: user.name,
    //     email: user.email,
    //   },
    //   token,
    // });

    generateToken(
      res,
      user,
      `Welcome back, ${user.name}! You are logged in successfully`
    );
  } catch (error) {
    console.log("Login controller error", error);
    return res.status(500).json({
      success: false,
      message: "Login controller: " + error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        maxAge: 0,
        httpOnly: true,
        expires: new Date(0),
      })
      .json({
        success: true,
        message: "Logged out successfully",
      });
  } catch (error) {
    console.log("Logout controller error", error);
    return res.status(500).json({
      success: false,
      message: "Logout controller: " + error.message,
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId)
      .select("-password")
      .populate("enrolledCourses");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      user,
    });
  } catch (error) {
    console.log("Get user profile controller error", error);
    return res.status(500).json({
      success: false,
      message: "Get user profile controller: " + error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { name, email, password } = req.body;
    const profilePhoto = req.file;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // extract public id of the old image from the url if is it exist

    if (user.photoUrl) {
      const publicId = user.photoUrl.split("/").pop().split(".")[0]; // extract public id
      deleteMediaFromCloudinary(publicId);
    }

    // upload new photo
    const cloudResponse = await uploadMedia(profilePhoto.path);
    const photoUrl = cloudResponse.secure_url;

    const updatedData = { name, email, photoUrl };
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select("-password");

    return res.status(200).json({
      success: true,
      user: updatedUser,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.log("Update profile controller error", error);
    return res.status(500).json({
      success: false,
      message: "Update profile controller: " + error.message,
    });
  }
};
