// routes/product.routes.js
import express from "express";
import { addProduct, addToCart, getProducts } from "../controllers/products.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { uploadPhoto } from "../middlewares/multer.middleware.js";
const router = express.Router();

router.post("/api/add-Product", isAuthenticated,uploadPhoto.fields([{name:'productImage',maxCount:1}]), addProduct);
router.get("/api/products",isAuthenticated, getProducts);
router.post("/api/cart",isAuthenticated, addToCart);

export default router;
