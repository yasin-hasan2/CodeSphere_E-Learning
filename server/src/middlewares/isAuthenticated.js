import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token || "";
    // const token = req.cookies.token ;
    if (!token) {
      return res.status(401).json({
        success: false,
        message:
          "You are not logged in. Please log in to access this resource.",
      });
    }

    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decode) {
      return res.status(401).json({
        success: false,
        message: "Invalid token. Please log in again to access this resource.",
      });
    }
    req.id = decode.userId;
    // req.user = decode;
    next();
  } catch (error) {
    console.log("Is authenticated middleware error", error);
  }
};

export default isAuthenticated;
