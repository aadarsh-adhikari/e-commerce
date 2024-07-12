import JWT from "jsonwebtoken";
import usermodel from "../models/usermodel.js";
export const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; 
    const decode = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.error("Token Verification Error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

//checking admin or user
export const isAdmin = async (req, res, next) => {
  try {
    const user = await usermodel.findById(req.user._id);
    if (user.role == 0) {
      return res.status(401).send({
        success: false,
        message: "unautorized access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
  }
};
