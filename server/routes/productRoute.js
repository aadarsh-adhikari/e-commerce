import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authmiddleware.js";
import { createProductController, deleteProductController, getProductController, getProductPhoto, getSingleProduct, updateProductController } from "../controller/product.js";
import ExpressFormidable from "express-formidable";
const router = express.Router();
//create product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  ExpressFormidable(),
  createProductController
);
//get product
router.get("/get-product", getProductController);
//get single product
router.get("/get-product/:slug", getSingleProduct );
//get product photo
router.get("/product-photo/:pid", getProductPhoto);
//delete product
router.delete("/delete-product/:pid",requireSignIn,isAdmin, deleteProductController);
//update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  ExpressFormidable(),
  updateProductController
);

export default router;
