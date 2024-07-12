import express from "express";
import {
  registerController,
  loginController,
  testController,
} from "../controller/auth.js";
import { isAdmin, requireSignIn } from "../middlewares/authmiddleware.js";
const router = express.Router();
//register route
router.post("/register", registerController);

//login route
router.post("/login", loginController);
//test middleware
router.get("/test", requireSignIn, isAdmin, testController);

//protected routes

//user route 
router.get('/user-auth', requireSignIn, (req, res) => {
  res.status(200).send({ok:true});
});

//admin route
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ok:true});
});
export default router;
