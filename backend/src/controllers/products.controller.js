// controllers/productController.js
import Product from "../models/products.model.js";
import { ApiResponse } from
import { ApiError } from "../ApiError.js";

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(new ApiResponse(200, products, "Products fetched successfully"));
  } catch (error) {
    next(new ApiError(500, "Error fetching products", error));
  }
};
