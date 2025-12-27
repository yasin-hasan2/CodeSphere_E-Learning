import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });

    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB error massage ", error);
  }
};

export default connectDb;
