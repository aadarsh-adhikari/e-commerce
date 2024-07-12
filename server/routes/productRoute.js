import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authmiddleware.js";
import { createProductController } from "../controller/product.js";
import ExpressFormidable from "express-formidable";
const router = express.Router();
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  ExpressFormidable(),
  createProductController
);
export default router;
