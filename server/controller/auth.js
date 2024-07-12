import usermodel from "../models/usermodel.js";
import { comparePassword, hashPassword } from "../utils/helper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;
    if (!name) {
      return res.send({message: "name is required" });
    }
    if (!email) {
      return res.send({message: "email is required" });
    }
    if (!password) {
      return res.send({message: "password is required" });
    }
    if (!address) {
      return res.send({message: "address is required" });
    }
    //checking existing user
    const existingUser = await usermodel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Email already exists please try login",
      });
    }
    //resister new user
    const hashedPassword = await hashPassword(password);
    const user = await new usermodel({
      name,
      email,
      password: hashedPassword,
      address,
    }).save();
    res.status(200).send({
      success:true,
      message: "user resistered",
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: "error in register",
      err,
    });
  }
};
//login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password",
        error,
      });
    }
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "email not found",
      });
    }
    const compare = await comparePassword(password, user.password);
    if (!compare) {
      return res.status(202).send({
        success: false,
        message: "invalid password",
      });
    }
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successful",
      user: {
        name: user.name,
        email: user.email,
        address:user.address,
        role:user.role
      },
      token,
    });
  } catch (error) {
    console.error("Error during process:", error);
    res.status(500).send({
      success: false,
      message: "error in login",
      error,
    });
  }
};
//test controller
export const testController = (req, res) => {
  res.send("you cant use this page");
};
